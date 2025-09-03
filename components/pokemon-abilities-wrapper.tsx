import { Pokemon } from '@/types/pokemon';
import { PokemonAbility } from './pokemon-ability';

interface PokemonAbilitiesWrapperProps {
  pokemon: Pokemon | undefined;
}

export function PokemonAbilitiesWrapper({
  pokemon,
}: PokemonAbilitiesWrapperProps) {
  if (!pokemon) {
    return null;
  }
  if (!pokemon.abilities) {
    return null;
  }
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Abilities</h2>
      <ul className="flex flex-col gap-4">
        {pokemon.abilities.map((a) => (
          <PokemonAbility
            key={a.ability.name}
            abilityName={a.ability.name}
            isHidden={a.is_hidden}
          />
        ))}
      </ul>
    </section>
  );
}