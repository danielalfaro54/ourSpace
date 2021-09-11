import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css';
import { Button } from 'semantic-ui-react'
import { MDBInput} from 'mdbreact';

export const Signin= () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState()
    const PostData = ()=>{
        //verifiyng email format
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: 'Correo electrónico inválido',classes:'#0f0f0f black darken-3'})
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
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: 'La contraseña y correo no coinciden',classes:'#0f0f0f black darken-3'})
        }else{
            localStorage.setItem('jwt',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html: 'Ingresó correctamente',classes:'#0f0f0f black darken-3'})
            history.push("/")
        }
    }).catch(err=>{
        console.log(err)
    })
    }

    const notify = () => toast("Wow so easy!");

    return (
        <div style={{display:'inline-flex',width:'100%',justifyContent:'center',marginTop:'7%'}}>
        {/* <img id="optionalstuff" src='https://res.cloudinary.com/danielalfa98/image/upload/v1631217683/Webp.net-resizeimage_dbaweb.png'
        style={{height:'200px',marginTop:'6rem',marginRight:'5rem'}}></img> */}
        <div className='mycard'>
        <div className="card auth-card" style={{backgroundColor: 'white', width:'23rem'}}>
           <h3>Iniciar sesión</h3>
           <div>
           <MDBInput label="Correo electrónico" outline style={{backgroundColor: 'white'}}
           type='text'
           value= {email}
           onChange = {(e)=>{
                setemail(e.target.value)
           }}
           />
           <MDBInput label="Contraseña" outline style={{backgroundColor: 'white'}}
           type='password'
           value= {password}
           onChange = {(e)=>{
                setpassword(e.target.value)
           }}
           />
           </div>
        <Button color='violet' type="submit" name="action" style = {{width:'100%'}}
         onClick= {()=>
             PostData()}
                >Ingresar
        </Button>
           
        <hr style={{width:'100%', marginTop:'22px', marginBottom:'22px'}}/>
           
        <h6 style={{fontSize:'13.5px'}}>¿Primera vez aquí?<Link to='/signup'> Regístrate.
        </Link></h6>
      </div>
        </div>
        </div>
    )
}