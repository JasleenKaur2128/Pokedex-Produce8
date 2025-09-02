import { Pokemon } from '@/types/pokemon';
import { PokemonOverview } from './pokemon-overview';

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  if (!pokemon) {
    return (
      <div className="text-center text-gray-600 mt-8">
        Loading Pokémon details...
      </div>
    );
  }
  return (
    <div className="max-w-[800px] mx-auto pt-4 pb-4  bg-white/80 backdrop-blur-md rounded-lg shadow-md">
      <PokemonOverview pokemon={pokemon} />
    </div>
  );
}
