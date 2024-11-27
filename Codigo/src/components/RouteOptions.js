import React from 'react';
import '../styles/RouteOptions.css';

const RouteOptions = () => {
  const routes = [
    {
      id: 1,
      medio: 'Auto',
      icono: '🚗', // Aquí puedes usar iconos de imágenes o emojis para representación
      tiempo: '10 min',
      oferta: 'S/11.00',
      distancia: '3.4km',
    },
    {
      id: 2,
      medio: 'Bus',
      icono: '🚌', // Aquí puedes usar iconos de imágenes o emojis para representación
      tiempo: '20 min',
      oferta: 'S/2.00',
      distancia: '6km',
    }
  ];

  return (
    <div className="routes-container">
      {routes.map((route) => (
        <div key={route.id} className="route-card">
          <div className="route-header">
            <h4>Ruta {route.id}</h4>
          </div>
          <div className="route-details">
            <div className="route-item">
              <span className="route-icon">{route.icono}</span>
              <p>{route.medio}</p>
            </div>
            <div className="route-item">
              <p>Tiempo aprox.</p>
              <p>{route.tiempo}</p>
            </div>
            <div className="route-item">
              <p>Oferta</p>
              <p>{route.oferta}</p>
            </div>
            <div className="route-item">
              <p>Distancia</p>
              <p>{route.distancia}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RouteOptions;