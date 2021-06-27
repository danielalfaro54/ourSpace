import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
//import M from 'materialize-css'

export const Signin= () => {
    const history = useHistory("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState()
    const PostData = ()=>{
        //verifiyng email format
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Correo electrónico inválido"})
            return
        }
        fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {
                email,
                password
            }
        )
    }).then(res=>res.json()).then(data=>{
        if(data.error){
            M.toast({html:data.error})
        }else{
            M.toast({html:"Ingresó correctamente"})
            history.push("/")
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
            <button className="btn waves-effect waves-light" type="submit" name="action">Login
    <i className="material-icons right"
    onClick= {()=>PostData()}
    >send</i>
        </button>
        <h6><Link to='/signup'>No tengo una cuenta
        </Link></h6>
      </div>
        </div>
    )
}