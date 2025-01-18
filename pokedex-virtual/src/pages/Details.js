import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';

// Mapeo de tipos de Pokémon en español
const tiposEnEspanol = {
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  bug: 'Bicho',
  normal: 'Normal',
  fighting: 'Lucha',
  ghost: 'Fantasma',
  fairy: 'Hada',
  poison: 'Veneno',
  ground: 'Tierra',
  rock: 'Roca',
  ice: 'Hielo',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  flying: 'Volador',
};

function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener los detalles del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error al cargar los detalles:', error));
  }, [id]);

  return (
    <div className="details">
      {pokemon ? (
        <div className="card-details">
          <h2 className="text-center text-light">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <div className="text-center">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="img-fluid rounded-circle shadow-lg"
            />
          </div>
          <div className="details-info">
            <p>Altura: {pokemon.height} decímetros</p>
            <p>Peso: {pokemon.weight} hectogramos</p>
            <p>Tipo(s): {pokemon.types.map(type => tiposEnEspanol[type.type.name] || type.type.name).join(', ')}</p>
          </div>
        </div>
      ) : (
        <div className="loading">Cargando...</div>
      )}
    </div>
  );
}

export default Details;
