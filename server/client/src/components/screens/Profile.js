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
                justifyContent: "center",
                marginTop:"2%",
                width:'100%'
            }}>
                <div>
                <img style={{width:'140px',height:'140px', borderRadius:"100%", marginLeft: "1.3rem",marginTop:'0.3rem'}}
                    src={state?state.pic:"loading"}
                ></img>
                </div>
                <div style={{marginTop:'17px',marginLeft:'7%'}}>
                    <h5 style={{fontSize:'21px'}}>{state?state.name:"loading"}</h5>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop:'11px'
                    }}>
                        <h6 style={{fontSize:'15px'}}>14 publicaciones</h6>
                    </div>
                    <br/>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%"
                    }}>
                        <h6>30 seguidores</h6>
                        <h6 style={{marginLeft: "1rem", marginRight:'1rem'}}>30 siguiendo</h6>
                    </div>
                </div>
            </div>
            <hr style={{width:'70%', marginTop:'20px', marginBottom:'20px'}}/>
        <div className ="postslist" style = {{width:'84%', display: "flex", marginLeft:'9%',marginRight:'9%',
                justifyContent: "space-around", flexWrap:'wrap'}}>
            {
                mypics.map(item=>{
                    return(
                        <img style={{height:'20rem', marginBottom:'1rem'}} key={item._id} className ="item" src= {item.photo}/>
                    )
                })
            }
        </div>
        </div>
    )
}