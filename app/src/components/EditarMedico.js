import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import '../App.css';
import '../formulario2.css';

const EditarMedico = ({ especialistaId }) => {
  const [medico, setMedico] = useState({});
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [especializacion, setEspecializacion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [region, setRegion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [educacion, setEducacion] = useState([]);
  const [experiencia, setExperiencia] = useState('');
  const [certificaciones, setCertificaciones] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [organizaciones, setOrganizaciones] = useState([]);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [foto_url, setFoto_url] = useState('');
  const [error, setError] = useState('');


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const especialistaId2 = searchParams.get('id');

  const [mensaje, setMensaje] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "apellido":
        setApellido(value);
        break;
      case "rut":
        setRut(value);
        break;
      case "especializacion":
        setEspecializacion(value);
        break;
      case "ciudad":
        setCiudad(value);
        break;
      case "region":
        setRegion(value);
        break;
      case "direccion":
        setDireccion(value);
        break;
      case "experiencia":
        setExperiencia(value);
        break;
      case "telefono":
        setTelefono(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "foto_url":
        setFoto_url(value);
        break;
      default:
        break;
    }
  };
  

  useEffect((espel) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe iniciar sesión para acceder a esta página');
      window.location.href = `/AdminLogin`;
    } else {
      const fetchMedico = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/medicos/${especialistaId2}`);
          setMedico(response.data);
  
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setRut(response.data.rut);
          setEspecializacion(response.data.especializacion);
          setCiudad(response.data.ciudad);
          setRegion(response.data.region);
          setDireccion(response.data.direccion);
          setEducacion(response.data.educacion);
          setExperiencia(response.data.experiencia);
          setCertificaciones(response.data.certificaciones);
          setPublicaciones(response.data.publicaciones);
          setOrganizaciones(response.data.organizaciones);
          setTelefono(response.data.telefono);
          setEmail(response.data.email);
          setFoto_url(response.data.foto_url);
  
        } catch (error) {
          console.error('Error fetching medico:', error);
        }
      };
      fetchMedico();
    }
    
  }, [especialistaId2]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/medicos/${especialistaId2}`, {
        nombre,
        apellido,
        rut,
        especializacion,
        ciudad,
        region,
        direccion,
        experiencia,
        telefono,
        email,
        foto_url

      });
      console.log('Médico actualizado:', response.data);
      setMensaje('Los datos del médico han sido actualizados correctamente.');
    } catch (error) {
      console.error('Error al actualizar el médico:', error);
      setMensaje('Hubo un error al intentar actualizar los datos del médico. Por favor, inténtelo de nuevo.');
    }

  };


  const handleSalirClick = () => {
    window.location.href = `/MedicosManager`;
  }

  return (
    <>
      <nav className='navbar'>
            <div className='navbar-left'>
              <h1>Inicio</h1>
            </div>
            <div className='navbar-right'>
              <button className='btn-admin-login' onClick={() => handleSalirClick()}>Volver</button>
            </div>
        </nav>
      <div className='form-container'>
        <h1>Editar Médico</h1>
        {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={nombre} onChange={handleChange} required />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" value={apellido} onChange={handleChange} required />

          <label htmlFor="rut">Rut:</label>
          <input type="text" id="rut" name="rut" value={rut} onChange={handleChange} required />

          <label htmlFor="especializacion">Especializacion:</label>
          <input type="text" id="especializacion" name="especializacion" value={especializacion} onChange={handleChange} required />

          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" value={ciudad} onChange={handleChange} required />

          <label htmlFor="region">Region:</label>
          <input type="text" id="region" name="region" value={region} onChange={handleChange} required />

          <label htmlFor="direccion">Direccion:</label>
          <input type="text" id="direccion" name="direccion" value={direccion} onChange={handleChange} required />

          <label htmlFor="experiencia">Experiencia:</label>
          <input type="text" id="experiencia" name="experiencia" value={experiencia} onChange={handleChange} required />

          <label htmlFor="telefono">Telefono:</label>
          <input type="text" id="telefono" name="telefono" value={telefono} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={email} onChange={handleChange} required />


          <label htmlFor="foto_url">URL de la foto:</label>
          <input type="url" id="foto_url" name="foto_url" value={foto_url} onChange={handleChange} required />


          <button type="submit">Actualizar Médico</button>
        </form>
      </div>
    </>
  );
};

export default EditarMedico;
