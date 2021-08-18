import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import './Home.css';

export const Home = () => {
    const [data,setData] = useState([])
    const {state,dispatch}= useContext(UserContext)

    useEffect(() => {
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result=>{
            console.log(result)
            setData(result)
        })
    })

    const deletePost = (postId)=>{
        fetch(`/deletepost/${postId}`,{
        method: "delete",
        headers: 
        {
            "Authorization":"Bearer " + localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        
        const newData = data.filter(item=>{
            return item._id!== result.id
        })
        setData(newData)
    })
}

    const likePost = (id)=>{
        fetch('/like',{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
         }).catch(err=>{
             console.log(err)
        })
    }

    const unlikePost = (id)=>{
        fetch('/unlike',{
            method: "put",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
           // console.log(result);
           const newData = data.map(item=>{
               if(item._id==result._id){
                   return result
               }else{
                   return item
               }
           })

           setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer" +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                name:localStorage.getItem("user").name,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            
            setData(newData)
         }).catch(err=>{
             console.log(err)
         })
      
        
    }
//    function deleteButton(item) {
//         if(item._id!== result.id){
//             return(
//                 <i class="bi bi-x" style={{float: 'right', fontSize: '1.5rem'}}
//                         onClick={()=>{
//                             deletePost(item._id)
//                     }}></i>
//             )}
//             else{
//                 return('');
//         }
//     }

    return (
        <div className="home">
            {data.map(item=>{
            return(

                <div className= "card home-card" style={{height:'100%'}} key={item._id}>
                    <h5><Link to={"/profile/" + item.postedby._id} style={{fontSize: '19px', marginLeft: '4%', color:'black'}}>
                    {item.postedby.name}
                    </Link>
                    {item.postedby._id.includes(state._id)
                    ?
                    <i title="Eliminar" class="bi bi-x" style={{float: 'right', fontSize: '1.5rem'}}
                        onClick={()=>{
                            deletePost(item._id)
                    }}></i>
                    :
                    <i></i>
                    }    
                    </h5>
                    
                    <div className="card-image">
                    <img src={item.photo} style={{width: '100%'}} />
                    </div>
                        <div className="card-content">
                            {item.likes.includes(state._id)
                            ? 
                            <i class="bi bi-hand-thumbs-up-fill" style={{fontSize: "2rem", color: '#ab47bc'}} 
                                onClick={()=>{
                                    unlikePost(item._id)
                                }}></i>
                            :
                            <i class="bi bi-hand-thumbs-up" style={{fontSize: "2rem"}} 
                                onClick={()=>{
                                    likePost(item._id)
                                }}></i>
                            }
                                <h6>{item.likes.length} Me gusta</h6>
                                <h5>{item.title}</h5>
                                <h6>{item.body}</h6>
                                <br/>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6><span style={{fontWeight:'500'}}>{record===undefined?"loading":record.postedBy===undefined?"loading":record.postedBy.name}
                                            </span>{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                    <input type= "text" placeholder ="Escribe un comentario"/>
                                </form> 
                    </div>
                </div> 
            )
        })}
        </div>
    )
}