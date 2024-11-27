import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cities.css'; // Asegúrate de crear este archivo CSS para los estilos

function Cities() {
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const navigate = useNavigate();
  const handleNext = () => {
    // Lógica para verificar las credenciales
    // Si son correctas, redirigir a /cities
    navigate('/dashboard');
  };

  return (
    <div className="cities-container">
      <div className="dropdown">
        <label htmlFor="city-select">Seleccionar Ciudad:</label>
        <select id="city-select" value={city} onChange={handleCityChange} className="city-select">
          <option value="">Ciudad</option>
          <option value="Arequipa">AREQUIPA</option>
          <option value="Ayacucho">AYACUCHO</option>
          <option value="Cajamarca">CAJAMARCA</option>
          <option value="Cusco">CUSCO</option>
        </select>
        <button className="next-button" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default Cities;
