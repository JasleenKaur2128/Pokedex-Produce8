import {
  formatPokemonName,
  formatTypeName,
  getPokemonImageUrl,
  getTypeColor,
} from '@/lib/pokemon-utils';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface PokemonOverviewProps {
  pokemon: Pokemon | undefined;
}

export function PokemonOverview({ pokemon }: PokemonOverviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const pokemonHeight = pokemon?.height ? pokemon.height / 10 : 0;
  const pokemonWeight = pokemon?.weight ? pokemon.weight / 10 : 0;

  const handleImageLoad = () => setImageLoaded(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (!pokemon) {
    return (
      <div className="text-center text-gray-600 mt-8">
        Loading Pokémon details...
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center mb-8">
      <div className="relative w-full max-w-[300px] lg:w-40 lg:h-40 aspect-square mb-4">
        {!imageLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
        {!imageError ? (
          <Image
            src={getPokemonImageUrl(pokemon.id)}
            alt={formatPokemonName(pokemon.name)}
            fill
            loading="lazy"
            unoptimized
            className={`object-contain transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            🎯
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-y-8 lg:gap-y-8 lg:items-center">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <div className="text-sm text-muted-foreground">Height</div>
            <div className="text-2xl font-bold text-gray-800">
              {pokemonHeight} m
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-center">
            <div className="text-sm text-muted-foreground">Weight</div>
            <div className="text-2xl font-bold text-gray-800">
              {pokemonWeight} kg
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {pokemon.types?.map(({ type }) => (
            <span
              key={type.name}
              className="text-base font-medium text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: getTypeColor(type.name) }}
            >
              {formatTypeName(type.name)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}