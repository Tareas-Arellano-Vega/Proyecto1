// src/components/MedicosList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import '../App.css';
import defaultImage from '../default.jpg'

const MedicosManager = () => {
  const [medicos, setMedicos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [error, setError] = useState('');

  // En MedicosManager


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debe iniciar sesión para acceder a esta página');
      window.location.href = `/AdminLogin`;
    } else {
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
    }
  }, [filtroTipo, filtroValor]);

  const handleFiltroTipoChange = (event) => {
    setFiltroTipo(event.target.value);
    setFiltroValor('');
  };

  const handleFiltroValorChange = (event) => {
    setFiltroValor(event.target.value);
  };

  const handleActualizarClick = () => {
    window.location.reload()
  };

  const handleSalirClick = () => {
    // Limpia el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    window.location.href = `/`;
  };

  const handleEditarClick = (especialistaId) => {
    window.location.href = `/EditarMedico?id=${especialistaId}`
  };

  const handleBorrarClick = async (medicoId) => {
    try {
      // Llamada DELETE a la API para borrar el médico
      await axios.delete(`http://localhost:3001/medicos/${medicoId}`);
      // Actualiza la lista de médicos después de borrar
      setMedicos(medicos.filter((medico) => medico._id !== medicoId));
    } catch (error) {
      console.error('Error al borrar el medico:', error);
    }
  };


  return (
    <>
      <nav className='navbar'>
          <div className='navbar-left'>
            <h1>Gestor de médicos</h1>
          </div>
          <div className='navbar-right'>
            <button className='btn-pedir-cita' onClick={() => window.location.href = '/FormularioMedico'}>Crear Nuevo Médico</button>
            <button className='btn-admin-login' onClick={() => handleSalirClick()}>Salir</button>
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
            <button className='btn-editar-medico'onClick={() => handleEditarClick(medico._id)}>Editar</button>
            <button className='btn-borrar-medico' onClick={() => handleBorrarClick(medico._id)}>Borrar</button>

            
          </div>
        ))}
      </div>
    </>
  );
};

export default MedicosManager;