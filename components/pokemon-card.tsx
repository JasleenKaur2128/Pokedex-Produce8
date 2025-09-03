'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLazyQuery } from '@/hooks/use-query';
import { getPokemonDetails } from '@/lib/api';
import {
  formatPokemonName,
  formatTypeName,
  getPokemonImageUrl,
  getTypeColor,
} from '@/lib/pokemon-utils';
import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface PokemonCardProps {
  pokemon: Pokemon;
  handleClick: (pokemon: Pokemon) => void;
}

export function PokemonCard({ handleClick, pokemon }: PokemonCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Lazy query for Pokemon details, loads immediately
  const [
    loadPokemonDetails,
    { data: detailedPokemon, isLoading: isLoadingDetails },
  ] = useLazyQuery(getPokemonDetails);

  useEffect(() => {
    if (!detailedPokemon && !isLoadingDetails) {
      loadPokemonDetails("pokemon", pokemon.id.toString());
    }
  }, [pokemon.id, detailedPokemon, isLoadingDetails, loadPokemonDetails]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card className="group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-6" onClick={() => handleClick(pokemon)}>
        <div className="text-center">
          {/* Pokemon ID */}
          <div className="text-sm font-medium text-muted-foreground mb-2">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>

          {/* Pokemon Image */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 rounded-full" />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            {!imageError ? (
              <Image
                src={getPokemonImageUrl(pokemon.id)}
                alt={formatPokemonName(pokemon.name)}
                fill
                loading="lazy"
                unoptimized
                className={`object-contain transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
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

          {/* Pokemon Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            {formatPokemonName(pokemon.name)}
          </h3>

          {/* Types */}
          {detailedPokemon?.types && detailedPokemon.types.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap justify-center gap-2">
                {detailedPokemon.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    className="text-xs font-medium text-white hover:scale-105"
                    style={{ backgroundColor: getTypeColor(type.name) }}
                  >
                    {formatTypeName(type.name)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoadingDetails && (
            <div className="space-y-2 mb-3">
              <div className="flex gap-2 justify-center">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
