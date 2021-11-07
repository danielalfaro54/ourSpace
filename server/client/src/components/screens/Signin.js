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
            M.toast({html: 'Invalid email address',classes:'#0f0f0f black darken-3'})
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
            M.toast({html: 'Your email and password do not match. Please try again.',classes:'#0f0f0f black darken-3'})
        }else{
            localStorage.setItem('jwt',data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html: 'Welcome!',classes:'#0f0f0f black darken-3'})
            history.push("/")
        }
    }).catch(err=>{
        console.log(err)
    })
    }

    return (
        <div style={{height:'100%',width:'100%',paddingTop:'7.4rem'}}>
            <div id='optionalstuff2' style={{ textAlign:'center',width:'100%',justifyContent:'center',marginTop:'-5rem'}}>
                <h1 className='titleText'
                     style={{fontWeight:'bold',fontSize:'3.4rem'}}>ourSpace</h1>
                <hr style={{width:'75%'}}/>
                <div style={{width:'100vw',textAlign:'center',paddingInline:'5rem'}}>
                <h6 style={{width:'100%',textAlign:'center',fontSize:'15px',justifyContent:'center'}}>A place to share your most important moments and discover a community of creators just like you</h6>     
            </div>
            </div>
        <div style={{display:'inline-flex',width:'100%',justifyContent:'center'}}>
        <div id='optionalstuff' style={{marginTop:'7rem',marginRight:'7rem'}}>
            <h1 className='titleText'
            style={{fontWeight:'bold',fontSize:'4rem'}}>ourSpace</h1>
            <br/>
            <h5 style={{width:'22rem'}}>A place to share your most important moments and discover a community of creators just like you</h5>     
        </div>
        <div className='mycard'>
        <div className="card auth-card" style={{backgroundColor: 'white', width:'23rem'}}>
           <h4>Sign in to your account</h4>
           <div>
           <MDBInput label="Email" outline style={{backgroundColor: 'white'}}
           maxLength="29"
           type='text'
           value= {email}
           onChange = {(e)=>{
                setemail(e.target.value)
           }}
           />
           <MDBInput label="Password" outline style={{backgroundColor: 'white'}}
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
                >Log in
        </Button>
           
        <hr style={{width:'100%', marginTop:'22px', marginBottom:'22px'}}/>
        <h6 style={{fontSize:'13.5px'}}>Don't have an account?<Link to='/signup'> Create one
        </Link></h6>
    </div>
      </div>
   
        </div>
         <div className="footer">
         <img id='footerimg' src='https://res.cloudinary.com/ourspacepics/image/upload/v1631672014/logo_zgxqou.png' style={{ height:'20px'}}/>
         <div id='footername'>
         <p style={{fontWeight:'bold',marginLeft:'7px',fontSize:'13px'}}>ourSpace</p>
         </div>
         
         <p style={{width:'99%',color:'grey',fontSize:'13px'}}>© 2021 ourSpace |  <i class="bi bi-envelope" style={{marginInline:'3px'}}></i>  our.spacem9@gmail.com </p>
     </div>
     </div>
    )
}