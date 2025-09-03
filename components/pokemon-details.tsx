import { Pokemon } from '@/types/pokemon';
import { InfoIcon, TrendingUp } from 'lucide-react';
import { PokemonDetailsTab } from './pokemon-details-tab';
import { PokemonOverview } from './pokemon-overview';
import { PokemonStatsChart } from './pokemon-stats-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
    <div className="max-w-[800px] mx-auto pt-4 pb-4  bg-white/80 backdrop-blur-md rounded-lg shadow-md p-4">
      <PokemonOverview pokemon={pokemon} />
      <Tabs defaultValue="details" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">
            <InfoIcon className="w-4 h-4 mr-2" />
            Details
          </TabsTrigger>
          <TabsTrigger value="stats">
            <TrendingUp className="w-4 h-4 mr-2" />
            Stats Chart
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <PokemonDetailsTab pokemon={pokemon} />
        </TabsContent>
        <TabsContent value="stats" className="mt-4">
            <PokemonStatsChart pokemon={pokemon} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
