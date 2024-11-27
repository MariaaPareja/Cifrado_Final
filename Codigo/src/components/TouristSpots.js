import React from 'react';
import { useNavigate } from 'react-router-dom';
import TouristSpotCard from './TouristSpotCard';
import '../styles/TouristSpots.css';

const TouristSpots = ({ setDestination }) => {
  const navigate = useNavigate();

  // Ejemplo de datos de lugares turísticos
  const spots = [
    {
      name: 'Plaza de Armas',
      description: 'Un lugar icónico en el centro de la ciudad.',
      image: 'plazadearmas.jpg',
      coordinates: [-16.39889, -71.53694] // Coordenadas de ejemplo para el destino
    },
    {
      name: 'Mirador de Yanahuara',
      description: 'Un mirador con una vista espectacular de los volcanes.',
      image: 'miradordeyanahuara.jpg',
      coordinates: [-16.39815, -71.54552]
    },
    {
      name: 'Monasterio de Santa Catalina',
      description: 'Una de las construcciones religiosas más importante de Perú.',
      image: 'santacatalina.png',
      coordinates: [-16.39815, -71.54552]
    },
    {
      name: 'Museos Santuarios Andinos',
      description: 'La momia Juanita se encuntra en este pequeño museo arqueológico.',
      image: 'santuarioandino.jpg',
      coordinates: [-16.39815, -71.54552]
    },
    // Agrega más lugares según sea necesario
  ];

  // Función que maneja la selección de un lugar turístico
  const handleSelect = (spot) => {
    setDestination(spot); // Establecemos el destino seleccionado
    navigate('/dashboard'); // Redirigimos al dashboard
  };

  return (
    <div className="tourist-spots-container">
      <h2>Lugares turísticos cercanos</h2>
      <div className="tourist-spots-list">
        {spots.map((spot) => (
          <TouristSpotCard
            key={spot.name}
            name={spot.name}
            description={spot.description}
            image={spot.image}
            onSelect={() => handleSelect(spot)}
          />
        ))}
      </div>
    </div>
  );
};

export default TouristSpots;
