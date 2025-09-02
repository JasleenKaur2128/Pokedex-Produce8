"use client";

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import { formatPokemonId, formatPokemonName } from '@/lib/pokemon-utils';
import { usePokemonDetails } from '@/hooks/use-pokemon-details';
import { PokemonDetails } from '@/components/pokemon-details';

export default function PokemonDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { pokemon, isLoading, error } = usePokemonDetails(+id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header
        className="
    sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm
    flex items-center gap-4 px-4 sm:px-81 h-20 sm:h-14"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-500" />

        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold capitalize whitespace-nowrap">
          {pokemon ? formatPokemonName(pokemon.name) : "Loading..."}
        </h1>

        <p className="text-lg font-normal text-muted-foreground whitespace-nowrap">
          {pokemon ? `${formatPokemonId(pokemon.id)}` : ""}
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading && (
          <div className="text-center text-gray-600 mt-8">
            Loading Pokémon...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mt-8">
            Failed to load Pokémon. Please try again.
          </div>
        )}

        {!isLoading && !error && pokemon && (
          <PokemonDetails pokemon={pokemon} />
        )}
      </main>
    </div>
  );
}