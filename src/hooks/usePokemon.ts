import { useQuery } from '@tanstack/react-query';
import { fetchPokemon, fetchPokemonList } from '../utils/pokemonApi';

export const usePokemonList = () => {
  return useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => fetchPokemonList(1000),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const usePokemon = (nameOrId: string | number) => {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
    enabled: !!nameOrId,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
