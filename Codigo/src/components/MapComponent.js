import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '80%',
  height: '80%',
  borderRadius: '20px',
};

const center = {
  lat: -16.405565267752763, // Coordenadas iniciales (Lima, Perú como ejemplo)
  lng: -71.54895244635459,
};

function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik, // Asegúrate de usar tu clave API aquí
  });

  const [location, setLocation] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error al obtener la ubicación.");
        }
      );
    }
  }, []);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={location}>
      <Marker position={location} />
    </GoogleMap>
  );
}

export default MapComponent;
