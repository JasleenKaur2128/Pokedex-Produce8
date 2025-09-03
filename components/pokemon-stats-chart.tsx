'use client';

import { Pokemon } from '@/types/pokemon';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { Card } from './ui/card';
import { BarChart3Icon } from 'lucide-react';

interface PokemonStatsChartProps {
  pokemon: Pokemon;
}

export function PokemonStatsChart({ pokemon }: PokemonStatsChartProps) {
  // Dummy data for initial implementation
  const dummyChartData = [
    { name: "HP", baseStat: 45, modifiedStat: 50 },
    { name: "Attack", baseStat: 49, modifiedStat: 54 },
    { name: "Defense", baseStat: 49, modifiedStat: 54 },
    { name: "Sp. Attack", baseStat: 65, modifiedStat: 72 },
    { name: "Sp. Defense", baseStat: 65, modifiedStat: 72 },
    { name: "Speed", baseStat: 45, modifiedStat: 50 },
  ];

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3Icon className="w-6 h-6 text-blue-600" />
        <h2 className="xl:text-2xl text-xl font-bold text-gray-800">
          Base Stats vs Ability Effects
        </h2>
      </div>

      <div className="w-full h-80">
        <BarChart width={700} height={320} data={dummyChartData}>
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
