import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import { Dropdown, Image } from 'semantic-ui-react'

const Navbar= ()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      const trigger = (
        <span style={{display:'inline-flex',marginInline:'11px'}}>
          <Image style={{marginTop:'17px',fontSize:'12px'}} avatar src={state.pic} />
          <i class="bi bi-caret-down-fill" style={{color:'white',fontSize:'0.7rem'}}></i>
        </span>
      )
      
      const options = [
        { key: 'user', text: 'Mi perfil', href:'/profile'},
        { key: 'sign-out', text: 'Cerrar sesión', onClick:()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push("/signin")}},
      ]
      
      return [
        <>
          <li><Link to="/create" className='links' style={{fontSize:'14px',marginTop:'1.5px'}}>Publicar</Link></li>
            <Dropdown
              trigger={trigger}
              options={options}
              pointing="top right"
              icon={null}
            />
          {/* <li><Link className='links' 
           onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push("/signin")}}
            style={{fontSize:'14px', marginTop:'1.5px'}}>Cerrar sesión</Link>
          </li> */}
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
      <Link to={state?"/":"/signin"} className="brand-logo left b" style={{fontSize:'20px', color:'white'}}>
      <img src='https://res.cloudinary.com/danielalfa98/image/upload/v1628646860/e8e1153d4d014fdb9000a0a4e479b497_qtgxig_c0ht6b.png' style={{ height:'27px', paddingRight:'11px'}} />
        ourSpace
      </Link>
      <ul id="nav-mobile" className="right">
        
        {renderList()}
        
      </ul>
    </div>
  </nav>)
}
export default Navbar