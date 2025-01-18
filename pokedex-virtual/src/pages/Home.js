import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import './Home.css';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [types, setTypes] = useState([]); // Estado para los tipos
  const [selectedType, setSelectedType] = useState(''); // Estado para el tipo seleccionado

  // Diccionario de tipos en inglés a español
  const typeTranslations = {
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    ghost: 'Fantasma',
    bug: 'Bicho',
    dark: 'Oscuro',
    fairy: 'Hada',
    steel: 'Acero',
    rock: 'Roca',
    ground: 'Tierra',
    fighting: 'Lucha',
    poison: 'Veneno',
    flying: 'Volador',
    normal: 'Normal',
    unknown: 'Desconocido',
  };

  useEffect(() => {
    // Obtener todos los Pokémon
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => response.json())
      .then(data => {
        const pokemonData = data.results;
        const pokemonWithTypesPromises = pokemonData.map(pokemon =>
          fetch(pokemon.url)
            .then(response => response.json())
            .then(pokemonDetails => ({
              ...pokemon,
              types: pokemonDetails.types.map(type => type.type.name),
            }))
        );
        Promise.all(pokemonWithTypesPromises)
          .then(allPokemons => {
            setPokemons(allPokemons);
            setFilteredPokemons(allPokemons);
          })
          .catch(error => console.error('Error al cargar los Pokémon con tipos:', error));
      })
      .catch(error => console.error('Error al cargar los Pokémon:', error));

    // Cargar los tipos de Pokémon
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => setTypes(data.results))
      .catch(error => console.error('Error al cargar los tipos:', error));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
    if (e.target.value === '') {
      setFilteredPokemons(pokemons); // Si no hay tipo seleccionado, mostrar todos los Pokémon
    } else {
      // Filtrar Pokémon por tipo
      const filtered = pokemons.filter(pokemon =>
        pokemon.types.includes(e.target.value)
      );
      setFilteredPokemons(filtered);
    }
  };

  return (
    <div className="home">
      <h2>Lista de Pokémon</h2>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="filter-container">
        <select onChange={handleTypeFilter} value={selectedType} className="type-filter">
          <option value="">Filtrar por Tipo</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {typeTranslations[type.name] || type.name} {/* Mostrar tipo en español */}
            </option>
          ))}
        </select>
      </div>
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

export default Home;
