import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { Button } from 'semantic-ui-react'
import { MDBInput} from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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
        <div className="card auth-card" style={{backgroundColor: '#fbfbfb', width:'23rem', marginTop:'2%'}}>
           <h3>Registrarse</h3>
           <div>
           <MDBInput label="Nombre" outline style={{backgroundColor: 'white'}}
           type='text'
           value= {name}
           onChange = {(e)=>{
                setname(e.target.value)
           }}
           />
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
    <div class="file-field input-field" style={{display: 'inline-flex', marginTop:'1px', marginBottom:'1px'}}>
    <Button basic color='violet' style={{height:'47px', width:'100px'}}>
    <i class="bi bi-image" style={{marginRight:'5px', marginLeft:'-9px'}}></i>
       Foto de perfil
            <input type="file"
                onChange = {(e)=>{
                    setImage(e.target.files[0])
                }}
            />
             </Button>
            
            <div className="file-path-wrapper" >
                <input className="file-path validate" type="text" placeholder='*Opcional'/>
            </div>
            </div>
            <div>
            <br/>
            <Button color='violet' type="submit" name="action"
            style = {{width:'100%'}}
            onClick={()=>{
                PostData()
            }}
                >Crear cuenta
            </Button>
            </div>
         <hr style={{width:'100%', marginTop:'22px', marginBottom:'22px'}}/>
         <h6>¿Ya tienes una cuenta?<Link to='/signin'> Inicia sesión.
        </Link></h6>
      </div>
        </div>
    )
}