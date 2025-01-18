import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

function PokemonCard({ name, url }) {
  const id = url.split('/')[url.split('/').length - 2];
  return (
    <Link to={`/details/${id}`} className="pokemon-card">
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
      />
    </Link>
  );
}

export default PokemonCard;