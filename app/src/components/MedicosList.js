// src/components/MedicosList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import '../App.css';
import defaultImage from '../default.jpg'

const MedicosList = () => {
  const [medicos, setMedicos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroValor, setFiltroValor] = useState('');

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        let url = `http://localhost:3001/medicos/filter`;
        if (filtroTipo && filtroValor) {
          url += `?${filtroTipo}=${filtroValor}`;
        }
        const response = await axios.get(url);
        setMedicos(response.data);
      } catch (error) {
        console.error('Error fetching medicos:', error);
      }
    };
    fetchMedicos();
  }, [filtroTipo, filtroValor]);

  const handleFiltroTipoChange = (event) => {
    setFiltroTipo(event.target.value);
    setFiltroValor('');
  };

  const handleFiltroValorChange = (event) => {
    setFiltroValor(event.target.value);
  };

  const handlePedirCitaClick = (especialistaId) => {
    window.location.href = `/PedirCita?id=${especialistaId}`;
  };

  const handleAdminLoginClick = () => {
    window.location.href = `/AdminLogin`;
  };
  const handleActualizarClick = () => {
    window.location.reload()
  };
  
  const handlePerfilClick = (especialistaId) => {
    window.location.href = `/PerfilMedico?id=${especialistaId}`;
  };

  return (
    <>
      <nav className='navbar'>
          <div className='navbar-left'>
            <h1>Inicio</h1>
          </div>
          <div className='navbar-right'>
            <button className='btn-admin-login' onClick={() => handleAdminLoginClick()}>Admin Login</button>
          </div>
      </nav>
      <div className='medicos-container'>
        <div className='medicos-header'>
          <h1>Lista de Médicos</h1>
          <div className='filtro-container'>
          <button className='btn-actualizar' onClick={handleActualizarClick}>Actualizar Lista</button>
            <select value={filtroTipo} onChange={handleFiltroTipoChange} className='select-filtro'>
              <option value="">Seleccionar filtro</option>
              <option value="nombre_completo">Nombre Completo</option>
              <option value="especializacion">Especialidad</option>
              <option value="ciudad">Ciudad</option>
              <option value="region">region</option>
            </select>
            {filtroTipo && (
              <input
                type="text"
                value={filtroValor}
                onChange={handleFiltroValorChange}
                placeholder={`Buscar por ${filtroTipo}`}
                className='input-filtro'
              />
            )}
          </div>
        </div>
        {medicos.map((medico) => (
          <div key={medico._id} style={{ marginBottom: '20px' }} className='medico-card'>
            <img src={medico.foto_url || defaultImage} alt={`Foto de ${medico.nombre} ${medico.apellido}`} style={{width: 100}} />
            <h2>{medico.nombre} {medico.apellido}</h2>
            <p><strong>Especialización:</strong> {medico.especializacion}</p>
            <p><strong>Experiencia:</strong> {medico.experiencia}</p>
            <p><strong>Ciudad:</strong> {medico.ciudad}</p>
            <p><strong>Región:</strong> {medico.region}</p>
            <p><strong>Email:</strong> {medico.email}</p>
            <p><strong>Teléfono:</strong> {medico.telefono}</p>
            <p><strong>Dirección:</strong> {medico.direccion}, {medico.ciudad}</p>
            <button className='btn-pedir-cita' onClick={() => handlePedirCitaClick(medico._id)}>Pedir Cita</button>
            <button className='btn-ver-perfil' onClick={() => handlePerfilClick(medico._id)}>Perfil</button>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default MedicosList;
