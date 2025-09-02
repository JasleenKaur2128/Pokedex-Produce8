import { useQuery } from './use-query';
import { getPokemonDetails } from '@/lib/api';

export function usePokemonDetails(id: number) {
  const { data, isLoading, error } = useQuery(
    `pokemon-${id}`,
    `pokemon-${id}`,
    async () => {
      return getPokemonDetails(id);
    }
  );

  return { pokemon: data, isLoading, error };
}