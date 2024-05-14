import React, { useState } from 'react';
import axios from 'axios';

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
      // Aquí puedes manejar la respuesta del servidor, por ejemplo, guardar el token JWT en el almacenamiento local y redirigir al usuario a otra página
      window.location.href = '/MedicosManager'
    } catch (error) {
      setError('Credenciales incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión de Administradores</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default AdminLogin;
