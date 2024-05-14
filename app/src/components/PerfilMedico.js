import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    <div>
      <h1>Perfil del Médico</h1>
      <img src={medico.foto_url} alt={`Foto de ${medico.nombre} ${medico.apellido}`} style={{width: 100}} />
      <p>Nombre: {medico.nombre}</p>
      <p>Apellido: {medico.apellido}</p>
      <p>Rut: {medico.rut}</p>
      <p>Especializacion: {medico.especializacion}</p>
      <p>Ciudad: {medico.ciudad}</p>
      <p>Region: {medico.region}</p>
      <p>Direccion: {medico.direccion}</p>
      <p>Telefono: {medico.telefono}</p>
      <p>Educacion: {medico.educacion}</p>
      <p>Experiencia: {medico.experiencia}</p>
      <p>Certificaciones: {medico.certificaciones}</p>
      <p>Publicaciones: {medico.publicaciones}</p>
      <p>Organizaciones: {medico.organizaciones_profesionales}</p>
      <p>Email: {medico.email}</p>
      {/* Mostrar otros parámetros del médico aquí */}
    </div>
  );
};

export default PerfilMedico;
