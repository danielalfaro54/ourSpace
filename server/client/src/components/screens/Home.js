import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom'
import './Home.css';
import { Button } from 'semantic-ui-react'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    return (  
        <div className="home">
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop:"2.4%",
                width:'100%'}}>
            <Button.Group basic widths='2' style={{width:'24rem'}}>
                  <Button className='sortbar'>
                      <Link to="/" className='links2'>
                        Todo
                      </Link>
                  </Button>
                  <Button>
                       <Link to="/followingposts" className='links2'>
                        Siguiendo
                       </Link>
                  </Button>     
            </Button.Group>
            </div>
            {data.map(item=>{
            return(
                <div className= "card home-card" style={{height:'100%'}} key={item._id}>
                    <h5>
                    {item.postedby._id===(state._id)
                    ?
                        <Link to=
                    {"/profile/"} style={{fontSize: '14.5px', marginLeft: '4%', color:'black',fontWeight:'bold'}}>
                    {item.postedby.name}
                        </Link>
                    :
                        <Link to=
                    {"/profile/" + item.postedby._id} style={{fontSize: '14.5px', marginLeft: '4%', color:'black', fontWeight:'bold'}}>
                    {item.postedby.name}
                        </Link>
                    } 
                          
                    {item.postedby._id===(state._id)
                    ?
                    <i title="Eliminar" class="bi bi-x" style={{float: 'right', fontSize: '1.6rem',marginTop:'-0.1rem'}}
                        onClick={()=>{
                            confirmAlert({
                                title: 'Eliminar',
                                message: '¿Estás seguro de que quieres borrar la publicación?',
                                buttons: [
                                  {
                                    label: 'Sí',
                                    onClick: () => deletePost(item._id)
                                  },
                                  {
                                    label: 'No, cancelar',
                                    onClick: () => <i/>
                                  }
                                ]
                              }); 
                    }}></i>
                    :
                    <i></i>
                    }    
                    </h5>
                    
                    <div className="card-image">
                    <img src={item.photo} style={{width: '100%'}} />
                    </div>
                        <div className="card-content" style={{marginTop:'-0.7rem'}}>
                        <h5 style={{display:'inline-flex',fontSize: '15px'}}>{item.title}</h5>
                        <h6 style={{display:'inline-flex',float:'right',marginLeft:'0.6rem'}}>
                            {item.likes.includes(state._id)
                            ? 
                            <i class="bi bi-heart-fill" style={{fontSize: "1.5rem", color: '#804FB3', marginRight:'0.5rem'}} 
                                onClick={()=>{
                                    unlikePost(item._id)
                                }}></i>
                            :
                            <i class="bi bi-heart" style={{fontSize: "1.5rem", marginRight:'0.5rem'}} 
                                onClick={()=>{
                                    likePost(item._id)
                                }}></i>
                            }
                            <h6 style={{marginTop:'0.25rem', marginLeft:'0.1rem',color:'grey',fontSize:'13px',fontWeight:'bold'}}>{item.likes.length}</h6></h6>
                            <h6 style={{fontSize: '13.5px'}}>{item.body}</h6>
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
                                    <input type= "text" placeholder ="Escribe un comentario"
                                        style={{marginTop:'0.4rem', marginBottom:'-0.3rem',fontSize:'13.5px',fontWeight:'lighter'}}/>
                                </form> 
                    </div>
                </div> 
            )
        })}
        </div>
    )
}