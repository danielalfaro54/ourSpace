import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

export const Signup= () => {
    const history = useHistory()
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [url, seturl] = useState(undefined)
    const [image, setImage] = useState("")
    
    useEffect(() => {
        if(url) {
            uploadFields()
        }
    },[url])

    const uploadpic =()=> {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","SocialNetwork9")
        data.append("cloud_name","danielalfa98")
        
        fetch("https://api.cloudinary.com/v1_1/danielalfa98/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
             seturl(data.url)
        }).catch(err=>{
            console.log(err);
        })
    } 

    const uploadFields = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Correo electrónico inválido"})
            return
        }
        fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {
                name:name,
                email:email,
                password:password,
                pic:url
            }
        )
    }).then(res=>res.json()).then(data=>{
        if(data.error){
            M.toast({html:data.error})
        }else{
            M.toast({html:data.message})
            history.push("/signin")
        }
    }).catch(err=>{
        console.log(err)
    })
    }

    const PostData = ()=>{
        if(image){
            uploadpic()
        } else{
            uploadFields()
        }
       
    }
    return (
        <div className='mycard'>
        <div className="card auth-card">
           <h3>The Social Network</h3>
           <input
           type='text'
           placeholder='Nombre'
           value= {name}
           onChange = {(e)=>{
                setname(e.target.value)
           }}
           />
           <input
           type='text'
           placeholder='Correo electrónico'
           value= {email}
           onChange = {(e)=>{
                setemail(e.target.value)
           }}
           />
           <input
           type='text'
           placeholder='Contraseña'
           value= {password}
           onChange = {(e)=>{
                setpassword(e.target.value)
           }}
           />
    <div class="file-field input-field">
        <div className="btn">
        <span>subir imagen</span>
            <input type="file"
                onChange = {(e)=>{
                    setImage(e.target.files[0])
                }}
            />
        </div>
        <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>

            <button 
            onClick={()=>{
                PostData()
            }}
            className="btn waves-effect waves-light" type="submit" name="action">Sign up
    <i className="material-icons right">send</i>
        </button>
        <h6><Link to='/signin'>Ya tienes una cuenta?
        </Link></h6>
      </div>
        </div>
    )
}