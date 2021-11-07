import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import { Dropdown} from 'semantic-ui-react'

const Navbar= ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      const trigger = (
        <span style={{display:'inline-flex',marginRight:'17px'}}>
          <div>
          <img className='profileimg2' src={state.pic} />
          </div>
          <i class="bi bi-caret-down-fill" style={{color:'white',fontSize:'0.6rem',marginTop:'2px'}}></i>
        </span>
      )
      
      const options = [
        { },
        { key: 'user',text: 'Profile', href:'/profile'},
        { key: 'sign-out', text: 'Log out', onClick:()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")}},
      ]
      
      return [
        <>
          <li><Link to="/create" className='links' 
          style={{fontSize:'14px',marginTop:'0.4px', marginRight:'15px', display:'inline-flex',fontWeight:'bold'}}>
          <i class="bi bi-plus" style={{fontSize:'15px'}}></i>Post</Link></li>

            <Dropdown
              trigger={trigger}
              options={options}
              pointing="top right"
              icon={null}
            />
        </>
      ]
    }else {
      return [  <>
          <li><Link to="/signin" className='links'>Log In</Link></li>
          <li><Link to="/signup" className='links'>Sign Up</Link></li>
        </>
      ]
    }
  }

  if(state){

  return (
  <nav className='navbarz'>

  <div className="nav-wrapper #212121 grey darken-4">
    <Link to={state?"/":"/signin"} className="brand-logo left b" style={{fontSize:'17px', color:'white'}}>
    <img src='https://res.cloudinary.com/ourspacepics/image/upload/v1631672014/logo_zgxqou.png' style={{ height:'25px', paddingRight:'11px'}} />
      ourSpace
    </Link>
    <ul id="nav-mobile" className="right">
      
      {renderList()}
      
    </ul>
  </div>
</nav>)
  } 
  else{
    return ('');
  }
}

export default Navbar