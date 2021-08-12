import React, { useState, useContext, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
import { Button } from 'semantic-ui-react'
import { MDBInput, MDBContainer, MDBRow, MDBBtn, MDBCol, MDBCard, MDBCardBody} from 'mdbreact';

export const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
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
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error})
        }else{
            localStorage.setItem('jwt',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"Ingresó correctamente"})
            history.push("/")
        }
    }).catch(err=>{
        console.log(err)
    })
    }
    return (
        <div className= 'singinc' style={{ marginTop: '5%'}} >
        <MDBContainer style={{width: '325px', height: '80%'}}>
        <MDBRow >
          <MDBCol >
            <MDBCard style={{backgroundColor: '#fafafa'}}>
              <MDBCardBody className= 'singinc'>
                <form >
           <p className="h4 text-center py-4" style={{fontSize:'26px'}}>Iniciar Sesión</p>
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
        <Button onClick= {()=>PostData()} color='violet' type="submit" name="action" style = {{width:'99%'}}
            >Ingresar
        </Button>
           <br>
           </br>
           <br>
           </br>
        <h6>¿Primera vez aquí?<Link to='/signup'> Regístrate.
        </Link></h6>
      </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    )
}