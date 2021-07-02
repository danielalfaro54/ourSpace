import React, { useContext, useEffect, useState } from 'react'
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
                justifyContent: "space-around",
                margin:"18px 0px",
                borderBottom: "1px solid grey" 
            }}>
                <div>
            <img style={{width:"160px", height: "160px", borderRadius:"80px"}}
            src="https://images.unsplash.com/photo-1600364769238-1e76e9ff91cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80"
            ></img>
                </div>
                <div>
                    <h5>{state?state.name:"loading"}</h5>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "108%"
                    }}>
                        <h6>14 posts</h6>
                        <h6>30 seguidores</h6>
                        <h6>30 siguiendo</h6>

                    </div>
                </div>
            </div>
        
        <div className ="postslist">
            {
                mypics.map(item=>{
                    return(
                        <img style={{width:"400px", height: "400px"}} key={item._id} className ="item" src= {item.photo}/>
                    )
                })
            }
        </div>
        </div>
    )
}