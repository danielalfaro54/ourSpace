import React from 'react'
import { Link } from 'react-router-dom'

export const Signin= () => {
    return (
        <div className='mycard'>
        <div className="card auth-card">
           <h3>The Social Network</h3>
           <input
           type='text'
           placeholder='Correo electrónico'
           />
           <input
           type='text'
           placeholder='Contraseña'
           />
            <button className="btn waves-effect waves-light" type="submit" name="action">Login
    <i className="material-icons right">send</i>
        </button>
        <h6><Link to='/signup'>No tengo una cuenta
        </Link></h6>
      </div>
        </div>
    )
}