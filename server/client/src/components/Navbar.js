import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar= ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      return [
        <>
          <li><Link to="/create" className='links'>Publicar</Link></li>
          <li><Link to="/profile" className='links'>Mi Perfil</Link></li>
          <li><Link to="/followingposts" className='links'>Siguiendo</Link></li>
          <li><Link className='links' 
           onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin")}}>Cerrar sesión</Link>
          </li>
        </>
      ]
    }else {
      return [  <>
          <li><Link to="/signin" className='links'>Iniciar sesión</Link></li>
          <li><Link to="/signup" className='links'>Registrarse</Link></li>
        </>
      ]
    }
  }
    return (<nav className='navbarz'>
    <div className="nav-wrapper #212121 grey darken-4">
    
      <Link to={state?"/":"/signin"} className="brand-logo left b" style={{fontSize:'21px', color:'white'}}>
      <img src='https://res.cloudinary.com/danielalfa98/image/upload/v1628646860/e8e1153d4d014fdb9000a0a4e479b497_qtgxig_c0ht6b.png' style={{ height:'28px', paddingRight:'10px'}} />
        ourSpace
      </Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        {renderList()}
        
      </ul>
    </div>
  </nav>)
}
export default Navbar