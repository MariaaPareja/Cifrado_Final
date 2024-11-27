import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Dashboard.css'
//import MapComponent from './MapComponent';
import MapView from './MapView';



function Dashboard({ destination }) {
  const [locationName, setLocationName] = useState('Arequipa');

  // Obtenemos el nombre de la ubicación en tiempo real desde el MapView y actualizamos el menú lateral
  const handleLocationUpdate = (newLocationName) => {
    setLocationName(newLocationName);
  };
  /*
  const handleLocationData = (data) => {
    console.log('Nombre de la ubicación:', data.name);
    console.log('Ubicación cifrada:', data.encryptedLocation);
  };*/

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
            <Link to="/login-form">UrbanGo</Link>
        </div>
        <ul>
          <li>{locationName}</li> {/* Actualizamos con el nombre de la ubicación */}
          {/*<li><Link to="/dashboard">Mi ubicación</Link></li>*/}
          <li>{destination ? `Destino: ${destination.name}` : 'Mi destino'}</li>
          <li><Link to="/tourist-spots">Lugares turísticos</Link></li>
          <li><Link to="/routes-options">Rutas</Link></li>
        </ul>
      </div>
      <div className="map-container">
        {/*<MapView onLocationUpdate={handleLocationData} destination={destination}/>*/}
        <MapView onLocationUpdate={handleLocationUpdate} destination={destination} />

      </div>
    </div>
  );
}

export default Dashboard;

