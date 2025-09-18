import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';

export const pokemonApi = axios.create({
  baseURL: POKEMON_API_BASE,
  timeout: 10000,
});

export const fetchPokemonList = async (
  limit = 1000,
): Promise<PokemonListResponse> => {
  const response = await pokemonApi.get<PokemonListResponse>(
    `/pokemon?limit=${limit}`,
  );
  return response.data;
};

export const fetchPokemon = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  const response = await pokemonApi.get<Pokemon>(`/pokemon/${nameOrId}`);
  return response.data;
};

export const fetchMultiplePokemon = async (
  names: string[],
): Promise<Pokemon[]> => {
  const promises = names.map((name) => fetchPokemon(name));
  return Promise.all(promises);
};

export const getDisplayName = (name: string): string => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getPokemonImageUrl = (pokemon: Pokemon): string => {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    ''
  );
};

export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return colors[type] || '#68A090';
};
