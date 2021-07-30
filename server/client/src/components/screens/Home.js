import React, { useState, useEffect, useContext } from 'react'
import {UserContext} from '../../App'
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
            {data.map(item=>{
            return(
                <div className= "card home-card" key={item._id}>
                    <h5><Link to={"/profile/" + item.postedby._id}>
                        {item.postedby.name}
                    </Link>
                    <Icon name="delete" style={{float:"right"}} size='large'//small
                        onClick={()=>{
                            deletePost(item._id)
                    }}></Icon>
                    </h5>

                    <div className="card-image">
                    <img src={item.photo}/>
                    </div>
                        <div className="card-content">
                            {item.likes.includes(state._id)
                            ? 
                                <Icon name="thumbs up" size='big'
                                onClick={()=>{
                                    unlikePost(item._id)
                                }}></Icon>
                            :
                                <Icon name="thumbs up outline" size='big'
                                onClick={()=>{
                                    likePost(item._id)
                                }}></Icon>
                            }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
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
                                    <input type= "text" placeholder ="add a comment"/>
                                </form> 
                    </div>
                </div> 
            )

        })}
            
        </div>
    )
}