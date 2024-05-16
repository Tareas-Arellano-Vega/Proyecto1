import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import '../formulario2.css';

const FormularioMedico = () => {
  const [medico, setMedico] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    especializacion: '',
    ciudad: '',
    region: '',
    direccion: '',
    educacion: [],
    experiencia: '',
    certificaciones: [],
    publicaciones: [],
    organizaciones_profesionales: [],
    telefono: '',
    email: '',
    foto_url: ''
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
    if (!token) {
      setError('Debe iniciar sesión para acceder a esta página');
      window.location.href = `/AdminLogin`;
    } 



  const handleChange = (event) => {
    const { name, value } = event.target;
    setMedico({ ...medico, [name]: value });
  };

  const handleListChange = (event, field) => {
    const { value } = event.target;
    setMedico({ ...medico, [field]: value.split(',') });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/medicos', medico);
      console.log('Médico creado:', response.data);
      setMensajeExito('Medico creado exitosamente');
      setError('')
    } catch (error) {
      console.error('Error al crear el médico:', error);
      setError('Error al crear al medico')
      setMensajeExito('')
    }
  };

  return (
    <>
      <nav className='navbar'>
          <div className='navbar-left'>
            <h1>Inicio</h1>
          </div>
          <div className='navbar-right'>
            <button className='btn-admin-login' onClick={() => window.location.href='/MedicosManager'}>Volver</button>
          </div>
      </nav>
      <div className='form-container'>
        {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
        {error && <div className="mensaje-error">{error}</div>}
        <h2>Crear Nuevo Médico</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={medico.nombre} onChange={handleChange} required />

          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" name="apellido" value={medico.apellido} onChange={handleChange} required />

          <label htmlFor="rut">Rut:</label>
          <input type="text" id="rut" name="rut" value={medico.rut} onChange={handleChange} required />

          <label htmlFor="especializacion">Especializacion:</label>
          <input type="text" id="especializacion" name="especializacion" value={medico.especializacion} onChange={handleChange} required />

          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" value={medico.ciudad} onChange={handleChange} required />

          <label htmlFor="region">Region:</label>
          <input type="text" id="region" name="region" value={medico.region} onChange={handleChange} required />

          <label htmlFor="direccion">Direccion:</label>
          <input type="text" id="direccion" name="direccion" value={medico.direccion} onChange={handleChange} required />

          <label htmlFor="experiencia">Experiencia:</label>
          <input type="text" id="experiencia" name="experiencia" value={medico.experiencia} onChange={handleChange} required />

          <label htmlFor="telefono">Telefono:</label>
          <input type="text" id="telefono" name="telefono" value={medico.telefono} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={medico.email} onChange={handleChange} required />

          <label htmlFor="educacion">Educacion (separado por comas):</label>
          <input type="text" id="educacion" name="educacion" value={medico.educacion.join(',')} onChange={(e) => handleListChange(e, 'educacion')} />

          <label htmlFor="publicaciones">Publicaciones (separado por comas):</label>
          <input type="text" id="publicaciones" name="publicaciones" value={medico.publicaciones.join(',')} onChange={(e) => handleListChange(e, 'publicaciones')} />

          <label htmlFor="certificaciones">Certificaciones (separado por comas):</label>
          <input type="text" id="certificaciones" name="certificaciones" value={medico.certificaciones.join(',')} onChange={(e) => handleListChange(e, 'certificaciones')} />

          <label htmlFor="organizaciones_profesionales">Organizaciones Profesionales (separado por comas):</label>
          <input type="text" id="organizaciones_profesionales" name="organizaciones_profesionales" value={medico.organizaciones_profesionales.join(',')} onChange={(e) => handleListChange(e, 'organizaciones_profesionales')} />


          <label htmlFor="foto_url">URL de la foto:</label>
          <input type="url" id="foto_url" name="foto_url" value={medico.foto_url} onChange={handleChange} required />

          
          
          <button type="submit">Crear Médico</button>
        </form>
      </div>
    </>
  );
};

export default FormularioMedico;

