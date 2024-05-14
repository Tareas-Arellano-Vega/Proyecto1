// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicosList from './components/MedicosList';
import PedirCita from './components/PedirCita';
import AdminLogin from './components/AdminLogin';
import MedicosManager from './components/MedicosManager';
import FormularioMedico from './components/FormularioMedico';
import EditarMedico from './components/EditarMedico';
import PerfilMedico from './components/PerfilMedico';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MedicosList />} />
          <Route path="/PedirCita" element={<PedirCita />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/MedicosManager" element={<MedicosManager />} />
          <Route path="/FormularioMedico" element={<FormularioMedico />} />
          <Route path="/EditarMedico" element={<EditarMedico />} />
          <Route path="/PerfilMedico" element={<PerfilMedico />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

