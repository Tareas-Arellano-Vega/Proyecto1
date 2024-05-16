import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import '../formulario.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //const [success, setSuccess] = useState('');
  //const [token, setToken] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try  {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      console.log('Respuesta del servidor:', response.data);
      //setSuccess('Credenciales correctas');
      localStorage.setItem('token', response.data.token)
      
      window.location.href = '/MedicosManager'
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
      <nav className='navbar'>
          <div className='navbar-left'>
            <h1>Inicio</h1>
          </div>
          <div className='navbar-right'>
            <button className='btn-admin-login' onClick={() => window.location.href='/'}>Volver</button>
          </div>
      </nav>
      <div className='form-container'>
        <h1>Inicio de Sesión de Administradores</h1>
        <form onSubmit={handleFormSubmit}>
          
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          {error && <p>{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
