import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import {Link, useParams} from 'react-router-dom'
import { initialState } from '../../reducers/userReducer'
import { Button } from 'semantic-ui-react'

export const UserProfile= () => {
    const [Prof, setProf] = useState({})
    const [userfollower,setFollower] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const[Profile,setProfile] = useState()
    const[userProfile,setUserProfile] = useState("")
    const[userEmail,setUserEmail] = useState("")
    const{userid} = useParams()
    const[posts,setposts] = useState([])
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    const [userPic,setUserpic] = useState("")

    console.log(userid)
    useEffect(()=>{
            fetch(`/user/${userid}`,{
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                setUserProfile(result.user.name)
                setUserEmail(result.user.email)
                setProfile(result.posts.length)
                setposts(result.posts)
                setProf(result)
                setFollower(result.user.follower)
                setUserpic(result.user.pic)

            })
        },[] )
        
        const followUser = () => {
            fetch('/follow',{
                method:"put",
                headers:
                {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem('jwt')
                },
                body:JSON.stringify({
                    followId:userid
                })
            }).then(res=>res.json())
            .then(data=>{
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                    console.log(Prof);
                   return { user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]

                    }
                }
                })
                setShowFollow(false)
            })
        }

        const unfollowUser = () => {
            fetch('/unfollow',{
                method:"put",
                headers:
                {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem('jwt')
                },
                body:JSON.stringify({
                    followId:userid
                })
            }).then(res=>res.json())
            .then(data=>{
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                    const newFollower = prevState.user.followers.filter(item=>item!==data._id)

                   return { user:{
                        ...prevState,
                        users:{
                            ...prevState.user,
                            followers:newFollower
                        } 
                    }
                }
                })
                setShowFollow(true)
                window.location.reload();
            })
        }

    return (
        <>
        {
          posts?
            <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop:"2%",
                width:'100%'
            }}>
            <div>
            <img className='profileimg' style={{marginLeft: "1.3rem",marginTop:'0.3rem'}}
            src={userPic}/>
                </div>
            <div style={{marginTop:'1.2rem',marginLeft:'6%'}}>  
            <div style={{justifyContent:'inline',display:'flex'}}>
            <h6 style={{fontSize:'20px', fontWeight:'400',marginRight:'1rem',marginTop:'0.5rem'}}>{userProfile}</h6>
        {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow
              ?
              <Button color='violet' type="submit" name="action" style={{height:'2.35rem', width:'5.1rem',fontWeight:'bold'}}
                onClick= {()=>followUser()}>
                    <i style={{marginLeft:'-0.4rem'}}></i>
                Seguir
              </Button>    
              :
              <Button basic color='violet' type="submit" name="action" style={{height:'2.3rem', width:'8rem'}}
                onClick= {()=>unfollowUser()}>
                    <i class="bi bi-check2" style={{marginLeft:'-0.5rem'}}> </i>
                Siguiendo
              </Button> 
              }
              </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop:'0.9rem'
                    }}>
                        <h6 style={{fontSize:'14px'}}>{Profile} publicaciones</h6>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop:'1.3rem'
                    }}>
                        <h6 style={{marginRight:'1rem'}}>
                            {Prof.user ===undefined?" ":Prof.user.following===undefined?" ":Prof.user.following.length} siguiendo</h6>
                        <h6>{Prof.user ===undefined?" ":Prof.user.followers===undefined?" ":Prof.user.followers.length} seguidores</h6>
                    </div>
                </div>
            </div>
        <hr style={{width:'70%', marginTop:'20px', marginBottom:'20px'}}/>
        <div className ="postslist" style = {{width:'71%', display: "flex", marginInline:'14.5%',
                justifyContent: "space-around", flexWrap:'wrap'}}>
            {
                posts.map(item=>{
                    return(
                        <Link to={{ pathname: item.photo }} target="_blank">
                        <img style={{width:'20rem',height:'20rem',backgroundPosition: 'center center',objectFit: 'cover',marginBottom:'1rem',marginInline:'1rem'}} key={item._id} className ="item" src= {item.photo}
                        />
                        </Link>
                   )
                })
            }
        </div>
        </div>
            :
                "..."
        }
        </>
    )
}