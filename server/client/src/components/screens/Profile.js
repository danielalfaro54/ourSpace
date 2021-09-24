import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'

export const Profile= () => {
    const {state,dispatch} = useContext(UserContext)
    const[mypics,setPics] = useState([])

    useEffect(()=>{
            fetch("/mypost",{
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                setPics(result.mypost)
            })
        },[] )
    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop:"2%",
                width:'100%'
            }}>
                <div>
                <img className='profileimg' style={{marginLeft: "1.3rem",marginTop:'0.3rem'}}
                    src={state?state.pic:"loading"}
                ></img>
                </div>
                <div style={{marginTop:'1.4rem',marginLeft:'6%'}}>   
                    <h6 style={{fontSize:'19px', fontWeight:'400'}}>{state?state.name:"loading"}</h6>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%"
                    }}>
                         <h6 style={{fontSize:'14px',color:'grey'}}>{state?state.email:"loading"}</h6>
                    </div>
                    <br/>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop:'0.7rem'
                    }}>
                        <h6>{state?state.followers.length:"loading"} seguidores</h6>
                        <h6 style={{marginLeft: "1rem", marginRight:'1rem'}}>{state?state.following.length:"loading"} siguiendo</h6>
                    </div>
                </div>
            </div>
            <hr style={{width:'70%', marginTop:'20px', marginBottom:'30px'}}/>
        <div className ="postslist" style = {{width:'71%', display: "flex", marginInline:'14.5%',
                justifyContent: "space-around", flexWrap:'wrap'}}>
            {
                mypics.map(item=>{
                    return(
                        <Link to={{ pathname: item.photo }} target="_blank">
                        <img style={{width:'20rem',height:'20rem',backgroundPosition: 'center center',objectFit: 'cover',marginBottom:'1rem',marginInline:'1%'}} key={item._id} className ="item" src= {item.photo}
                        />
                        </Link>
                    )
                })
            }
            </div>
        </div>
    )
}