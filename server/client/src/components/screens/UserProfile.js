import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'
import { initialState } from '../../reducers/userReducer'

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
                //console.log(result)
                setUserProfile(result.user.name)
                setUserEmail(result.user.email)
                //console.log(userProfile)
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
                justifyContent: "space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey" 
            }}>
                <div>
            <img style={{width:"160px", height: "160px", borderRadius:"80px"}}
            src={userPic}
            />
                </div>
                <div>
        <h5>{userProfile}</h5>
        {!JSON.parse(localStorage.getItem("user")).following.includes(userid) && showfollow?
              <button onClick= {()=>followUser()} className="btn waves-effect waves-light blue" type="submit" name="action">Seguir
              <i className="material-icons right"
              >plus</i>
              </button>
                :
              <button onClick= {()=>unfollowUser()} className="btn waves-effect waves-light" type="submit" name="action">Dejar de seguir
              <i className="material-icons right"
              >plus</i>
              </button>}
                    <h5>{userEmail}</h5>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>
                        <h6>{Profile} publicaciones</h6>
                        <h6>{Prof.user ===undefined?"loading":Prof.user.followers===undefined?"loading":Prof.user.followers.length} seguidores</h6>
                        <h6>{Prof.user ===undefined?"loading":Prof.user.following===undefined?"loading":Prof.user.following.length} siguiendo</h6>

                    </div>
                </div>
            </div>
        
        <div className ="postslist">
            {
                // posts.map(item=>{
                //     return(
                //         <img style={{width:"400px", height: "400px"}} key={item._id} className ="item" src= {item.photo}/>
                //     )
                // })
            }
        </div>
        </div>

            :
            "..."
        }
        
        </>
    )
}