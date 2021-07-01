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
          <li><Link to="/create">Publicar</Link></li>
          <li><Link to="/profile">Mi Perfil</Link></li>
          <li>
          <button className="btn waves-effect waves-light #" type="submit" name="action" 
          onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push("/signin")
          }}>Cerrar sesión
        </button>
          </li>
        </>
      ]
    }else {
      return [  <>
          <li><Link to="/signin">Iniciar sesión</Link></li>
          <li><Link to="/signup">Registrarse</Link></li>
        </>
      ]
    }
  }

    return (<nav>
    <div className="nav-wrapper">
        
      <Link to={state?"/":"/signin"} className="brand-logo left b">The Social Network</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        {renderList()}
        
      </ul>
    </div>
  </nav>)
}
export default Navbar