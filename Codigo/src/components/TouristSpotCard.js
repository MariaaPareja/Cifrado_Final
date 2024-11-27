import React from 'react';
import '../styles/TouristSpotCard.css';

const TouristSpotCard = ({ name, description, image, onSelect }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <button className="select-button" onClick={onSelect}>Seleccionar</button>
      </div>
    </div>
  );
};

export default TouristSpotCard;
