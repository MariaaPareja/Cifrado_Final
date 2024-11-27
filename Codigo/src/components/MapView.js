import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/MapView.css';

import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';

//configuración para los íconos de los marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Componente para añadir la ruta usando Leaflet Routing Machine
const Routing = ({ position, destination }) => {
    const map = useMap();
  
    useEffect(() => {

      if (!position || !destination) return;
  
      // Creamos el control de rutas solo si existen tanto la posición como el destino
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(position), // Ubicación actual
          L.latLng(destination) // Destino seleccionado
        ],
        routeWhileDragging: true,
      }).addTo(map);
  
      return () => {
        if (map && routingControl) {
            try {
            routingControl.getPlan().setWaypoints([]);  // Limpia los waypoints
            map.removeControl(routingControl); // Elimina el control de rutas del mapa
            } catch (error) {
            console.error("Error eliminando el control de rutas:", error);
            }
        }
      };
    }, [map, position, destination]);
  
    return null;
  };
  
//position representa las coordernadas actuales
//locationName almacena nombre de la ubicación actual
const MapView = ({ onLocationUpdate, destination }) => {
  const [position, setPosition] = useState([-16.405534391666666, -71.5489256242888]); // Coordenadas por defecto
  const [locationName, setLocationName] = useState(''); // Para guardar el nombre de la ubicación

  // Función memoizada para obtener el nombre de la ubicación
  const getLocationName = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
      const data = await response.json();
      if (data && data.address) {
        const name = data.address.city || data.address.town || data.address.village || 'Ubicación desconocida';
        setLocationName(name);
        onLocationUpdate(name); // Llamamos a la función que se pasa para actualizar el nombre en el menú lateral
      } else {
        setLocationName('Ubicación desconocida');
        onLocationUpdate('Ubicación desconocida');
      }
    } catch (error) {
      console.error("Error al obtener el nombre de la ubicación:", error);
      setLocationName('Ubicación desconocida');
      onLocationUpdate('Ubicación desconocida');
    }
  }, [onLocationUpdate]);

    //***** */
    // Efecto para obtener y actualizar la posición actual del usuario
    useEffect(() => {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition( //watchposition obtiene las coordenadas en tiempo real
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]); // Actualiza la posición
            getLocationName(latitude, longitude); // Actualiza el nombre de la ubicación
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error);
          },
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );
  
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }
    }, [getLocationName]);
  
    return (
      <div className="map-view">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Marcador de la ubicación actual */}
          <Marker position={position}>
            <Popup>
              {locationName ? `Estás en: ${locationName}` : 'Obteniendo ubicación...'}
            </Popup>
          </Marker>

           {/* Marcador del destino */}
            {destination && (
            <Marker position={destination.coordinates}>
                <Popup>
                {`Destino: ${destination.name}`}
                </Popup>
            </Marker>
            )}
          
           {/* Ruta desde la ubicación actual hasta el destino */}
            {destination && <Routing position={position} destination={destination.coordinates} />}

        </MapContainer>
      </div>
    );
  };
  
  export default MapView;

/* version que funciona casi
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [position, setPosition] = useState([-16.405534391666666, -71.54887198011109]); // Coordenadas por defecto
  const [locationName, setLocationName] = useState(''); // Para guardar el nombre de la ubicación

  // Función para obtener el nombre de la ubicación
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`);
      const data = await response.json();
      if (data && data.address) {
        setLocationName(data.address.city || data.address.town || data.address.village || 'Ubicación desconocida');
      } else {
        setLocationName('Ubicación desconocida');
      }
    } catch (error) {
      console.error("Error al obtener el nombre de la ubicación:", error);
      setLocationName('Ubicación desconocida');
    }
  };

  useEffect(() => {
    // Geolocalización para obtener la ubicación del usuario
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          getLocationName(latitude, longitude);  // Obtener el nombre del lugar
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      // Cleanup function: dejar de observar la ubicación cuando el componente se desmonta
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, []);

  return (
    <div className="map-view">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            {locationName ? `Estás en: ${locationName}` : 'Obteniendo ubicación...'}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;*/






/*
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [position, setPosition] = useState([ -16.405565267752763, -71.54892025984768]); // Coordenadas por defecto

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.error("No se pudo obtener la ubicación");
        }
      );
    }
  }, []);

  return (
    <div className="map-view">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Aquí estás tú! <br /> Ubicación actual.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;

ENCRIPTACIÓN

import crypto from 'crypto-browserify';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsdEfPSBG4Z9WLu2gCC/O
GRn9QpGwTR1ceICU2QXe7kRJQEG5Ral7uzvBihp8mvBMf0zffDvfI2DwmDlQNyQn
uPjy3kX2GNq2KBH2jFMdMCFrl/q6egKkQ7lewBwbMAQIKfy8ka06fQq0ZmGiAvDj
WJpmXhWlZ9w1jf6/8upug6ms5S1KeVdNuGh9XrJiScshDmaBSRMKYDPuOlkPN46r
ImySYlFygW3koELCqxPi94ZrMpW+hOROBUwv/CvRwhRmcrRbMKvjqCKUbx3jdVOv
L0Ox/nUhyApjlm2AKHt15DLeHTPHQqLzsE2zcKG3On4MGyCtLN1BkefwpGe2+27D
qwIDAQAB
-----END PUBLIC KEY-----`;

//función para el cifrado que se usará en handleLocationUpdate
const encryptLocation = (latitude, longitude) => {
  const locationData = JSON.stringify({ lat: latitude, lng: longitude });

  // Cifrar con la clave pública
  const encryptedBuffer = crypto.publicEncrypt(publicKey, Buffer.from(locationData));
  // Convertir el resultado cifrado a base64 para transmitirlo
  return encryptedBuffer.toString('base64');
};
*/
