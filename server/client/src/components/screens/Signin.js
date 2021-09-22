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

    return (
        <div style={{height:'100%',width:'100%'}}>
            <div id='optionalstuff2' style={{ textAlign:'center',width:'100%',justifyContent:'center'}}>
                <h1 className='titleText'
                     style={{fontWeight:'bold',fontSize:'3.4rem'}}>ourSpace</h1>
                <hr/>
                <div style={{width:'100%',textAlign:'center',marginLeft:'2.1rem'}}>
                <h6 style={{width:'19rem',textAlign:'center',fontSize:'15px'}}>Comparte tus momentos más importantes y descubre una comunidad de creadores como tú</h6>     
            </div>
            </div>
        <div style={{display:'inline-flex',width:'100%',justifyContent:'center'}}>
        <div id='optionalstuff' style={{marginTop:'7rem',marginRight:'7rem'}}>
            <h1 className='titleText'
            style={{fontWeight:'bold',fontSize:'4rem'}}>ourSpace</h1>
            <br/>
            <h5 style={{width:'22rem'}}>Comparte tus momentos más importantes y descubre una comunidad de creadores como tú</h5>     
        </div>
        <div className='mycard'>
        <div className="card auth-card" style={{backgroundColor: 'white', width:'23rem'}}>
           <h4>Iniciar sesión</h4>
           <div>
           <MDBInput label="Correo electrónico" outline style={{backgroundColor: 'white'}}
           maxLength="29"
           type='text'
           value= {email}
           onChange = {(e)=>{
                setemail(e.target.value)
           }}
           />
           <MDBInput label="Contraseña" outline style={{backgroundColor: 'white'}}
           maxLength="45"
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
           
        <h6 style={{fontSize:'13.5px'}}>¿No tienes una cuenta?<Link to='/signup'> Regístrate.
        </Link></h6>
      </div>
        </div>
        </div>
        </div>
    )
}