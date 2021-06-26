import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

export const Signup= () => {
    const history = useHistory("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState()
    const PostData = ()=>{
        //verifiyng email format
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
                password:password
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