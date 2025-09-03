'use client';

import { formatStatsName } from '@/lib/pokemon-utils';
import { Pokemon } from '@/types/pokemon';
import { BarChart3Icon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';

interface PokemonStatsChartProps {
  pokemon: Pokemon;
}

export function PokemonStatsChart({ pokemon }: PokemonStatsChartProps) {
  // Transform real Pokemon stats data for the chart
  const chartData =
    pokemon.stats?.map((stat) => ({
      name: formatStatsName(stat.stat.name),
      baseStat: stat.base_stat,
      modifiedStat: stat.base_stat,
    })) || [];

  if (!pokemon.stats || chartData.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3Icon className="w-6 h-6 text-blue-600" />
          <h2 className="xl:text-2xl text-xl font-bold text-gray-800">
            Base Stats vs Ability Effects
          </h2>
        </div>
        <div className="text-center text-gray-600 mt-8">
          No stats data available for this Pokémon.
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3Icon className="w-6 h-6 text-blue-600" />
        <h2 className="xl:text-2xl text-xl font-bold text-gray-800">
          Base Stats vs Ability Effects
        </h2>
      </div>

      <div className="w-full h-80">
        <BarChart width={700} height={320} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Stat Value",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Legend />
          <Bar dataKey="baseStat" fill="#3b82f6" name="Base Stat" />
          <Bar dataKey="modifiedStat" fill="#8b5cf6" name="Ability Modified" />
        </BarChart>
      </div>
    </Card>
  );
}
