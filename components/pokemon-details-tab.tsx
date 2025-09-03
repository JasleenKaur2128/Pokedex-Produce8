import { Pokemon } from '@/types/pokemon';
import { PokemonAbilitiesWrapper } from './pokemon-abilities-wrapper';
import { PokemonBaseStats } from './pokemon-base-stats';

interface PokemonDetailsTabProps {
  pokemon: Pokemon;
}

export function PokemonDetailsTab({ pokemon }: PokemonDetailsTabProps) {
  return (
    <div className="space-y-6">
      <PokemonAbilitiesWrapper pokemon={pokemon} />
      <PokemonBaseStats pokemon={pokemon} />
    </div>
  );
}
