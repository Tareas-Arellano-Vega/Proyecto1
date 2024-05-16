import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import '../perfil.css';
import '../App.css';
import defaultImage from '../default.jpg'

const PerfilMedico = () => {
  const [medico, setMedico] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const especialistaId = searchParams.get('id');

  useEffect(() => {
    const fetchMedico = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/medicos/${especialistaId}`);
        setMedico(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medico:', error);
      }
    };
    fetchMedico();
  }, [especialistaId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

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

      <div className='perfil-container'>
        <h1>Perfil del Médico</h1>
        <img src={medico.foto_url || defaultImage} alt={`Foto de ${medico.nombre} ${medico.apellido}`} style={{width: 100}} className='perfil-img'/>
        <div className='detalle'>
          <p><strong>Nombre:</strong>{medico.nombre}</p>
          <p><strong>Apeliido:</strong>{medico.apellido}</p>
          <p><strong>Rut:</strong>{medico.rut}</p>
          <p><strong>Especialización:</strong>{medico.especializacion}</p>
          <p><strong>Ciudad:</strong>{medico.ciudad}</p>
          <p><strong>Región:</strong>{medico.region}</p>
          <p><strong>Dirección:</strong>{medico.direccion}</p>
          <p><strong>Teléfono:</strong>{medico.telefono}</p>
          <p><strong>Educación:</strong>{medico.educacion}</p>
          <p><strong>Experiencia:</strong>{medico.experiencia}</p>
          <p><strong>Certificaciones:</strong>{medico.certificaciones}</p>
          <p><strong>Publicaciones:</strong>{medico.publicaciones}</p>
          <p><strong>Organizaciones:</strong> {medico.organizaciones_profesionales}</p>
          <p><strong>Email:</strong>{medico.email}</p>
        </div>
      </div>
    </>
  );
};

export default PerfilMedico;
