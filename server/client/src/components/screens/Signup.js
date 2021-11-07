import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { Button } from 'semantic-ui-react'
import { MDBInput} from 'mdbreact';

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
        data.append("cloud_name","ourspacepics")
        
        fetch("https://api.cloudinary.com/v1_1/ourspacepics/image/upload",{
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
            M.toast({html: 'Invalid email address',classes:'#0f0f0f black darken-3'})
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
            M.toast({html: 'Please complete all required fields',classes:'#0f0f0f black darken-3'})
        }else{
            M.toast({html: 'Account created successfully!',classes:'#0f0f0f black darken-3'})
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
        <div style={{height:'100%',width:'100%', paddingTop:'2.1rem'}}>
        <div id='optionalstuff2' style={{ textAlign:'center',width:'100%',justifyContent:'center'}}>
            <h1 className='titleText'
                 style={{fontWeight:'bold',fontSize:'3.3rem'}}>ourSpace</h1>
            <hr style={{width:'75%'}}/>
            <div style={{width:'100vw',textAlign:'center',paddingInline:'5rem'}}>
            <h6 style={{width:'100%',textAlign:'center',fontSize:'15px'}}>Sign up to create, discover and share with the community</h6> 
        </div>
        </div>
        <div style={{display:'inline-flex',width:'100%',justifyContent:'center'}}>
        <div id='optionalstuff' style={{marginTop:'12rem',marginRight:'7rem'}}>
            <h1 className='titleText'
            style={{fontWeight:'bold',fontSize:'4rem'}}>ourSpace</h1>
            <br/>
            <h5 style={{width:'22rem'}}>Sign up to create, discover and share with the community</h5>     
        </div>                          
        <div className='mycard' id='signUpcard'>
        <div className="card auth-card" style={{backgroundColor: 'white', width:'23rem'}}>
           <h4>Sign up</h4>
           <div>
           <MDBInput label="Full name" outline style={{backgroundColor: 'white'}}
           maxLength="29"
           type='text'
           value= {name}
           onChange = {(e)=>{
                setname(e.target.value)
           }}
           />
           <MDBInput label="Email" outline style={{backgroundColor: 'white'}}
           maxLength="29"
           type='text'
           value= {email}
           onChange = {(e)=>{
                setemail(e.target.value)
           }}
           />
           <MDBInput label="Password" outline style={{backgroundColor: 'white'}}
           maxLength="46"
           type='password'
           value= {password}
           onChange = {(e)=>{
                setpassword(e.target.value)
           }}
           />
           </div>
    <div class="file-field input-field" style={{display: 'inline-flex', marginTop:'1px', marginBottom:'1px'}}>
    <Button basic color='violet' style={{height:'47px', width:'108px'}}>
    <i class="bi bi-image" style={{marginRight:'5px', marginLeft:'-9px'}}></i>
       Profile picture
            <input type="file"
                onChange = {(e)=>{
                    setImage(e.target.files[0])
                }}
            />
             </Button>
            
            <div className="file-path-wrapper" >
                <input className="file-path validate" type="text" placeholder='*Optional'/>
            </div>
            </div>
            <div>
            <br/>
            <Button color='violet' type="submit" name="action"
            style = {{width:'100%'}}
            onClick={()=>{
                PostData()
            }}
                >Create account
            </Button>
            </div>
         <hr style={{width:'100%', marginTop:'22px', marginBottom:'22px'}}/>
         <h6>Already have an account?<Link to='/signin'> Log in
        </Link></h6>
      </div>
        </div>
        </div>
        <div className="footer" id='footer'>
        <img id='footerimg' src='https://res.cloudinary.com/ourspacepics/image/upload/v1631672014/logo_zgxqou.png' style={{ height:'20px'}}/>
        <div id='footername'>
        <p style={{fontWeight:'bold',marginLeft:'7px',fontSize:'13px'}}>ourSpace</p>
        </div>
        <p style={{width:'99%',color:'grey',fontSize:'13px'}}>© 2021 ourSpace |  <i class="bi bi-envelope" style={{marginInline:'3px'}}></i>  our.spacem9@gmail.com </p>
    </div>
        </div>
    )
}