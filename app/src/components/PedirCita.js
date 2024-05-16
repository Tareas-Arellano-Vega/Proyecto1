// src/components/PedirCita.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../App.css';
import '../formulario.css';


const PedirCita = ({ especialistaId }) => {
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [correoPaciente, setCorreoPaciente] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const especialistaId2 = searchParams.get('id');


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/citas', {
        paciente:paciente,
        especialista_id: especialistaId2,
        fecha:fecha,
        hora:hora,
        correo_paciente: correoPaciente
      });
      console.log('Cita creada:', response.data);
      // Aquí puedes redirigir al usuario a una página de confirmación o hacer cualquier otra acción después de crear la cita
    } catch (error) {
      console.error('Error al crear la cita:', error);
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
        <h1> Pedir Cita </h1>
        <form onSubmit={handleFormSubmit}>
          <label> Nombre del Paciente: </label>
          <input type="text" value={paciente} onChange={(e) => setPaciente(e.target.value)} required />
          <label> Fecha: </label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          <label> Hora: </label>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
          <label> Correo del Paciente: </label>
          <input type="email" value={correoPaciente} onChange={(e) => setCorreoPaciente(e.target.value)} required />
          <button type="submit"> Pedir Cita </button>
        </form>
      </div>
    </>
  );
};

export default PedirCita;
