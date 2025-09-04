'use client';

import { useAbilityDetails } from '@/hooks/use-ability-details';
import { calculateAbilityEffect } from '@/lib/abilityEffects';
import { formatStatsName } from '@/lib/pokemon-utils';
import { Pokemon } from '@/types/pokemon';
import { BarChart3Icon, Zap } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PokemonStatsTooltip } from './pokemon-stats-tooltip';
import { StatCard } from './stat-card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PokemonStatsChartProps {
  pokemon: Pokemon;
}

interface SelectedAbility {
  name: string;
  isHidden: boolean;
}

export function PokemonStatsChart({ pokemon }: PokemonStatsChartProps) {
  const [selectedAbility, setSelectedAbility] =
    useState<SelectedAbility | null>(() => {
      const firstAbility = pokemon.abilities?.[0];
      return firstAbility
        ? {
            name: firstAbility.ability.name,
            isHidden: firstAbility.is_hidden,
          }
        : null;
    });

  const getModifiedStat = useCallback(
    (baseStat: number, statName: string) => {
      if (!selectedAbility) return baseStat;

      const { modified } = calculateAbilityEffect(
        selectedAbility.name,
        statName,
        baseStat
      );
      return modified;
    },
    [selectedAbility]
  );

  const chartData = useMemo(
    () =>
      pokemon.stats?.map((stat) => ({
        name: formatStatsName(stat.stat.name),
        baseStat: stat.base_stat,
        modifiedStat: getModifiedStat(stat.base_stat, stat.stat.name),
      })) || [],
    [pokemon.stats, getModifiedStat]
  );

  const baseTotal = useMemo(
    () => chartData.reduce((sum, stat) => sum + stat.baseStat, 0),
    [chartData]
  );

  const modifiedTotal = useMemo(
    () => chartData.reduce((sum, stat) => sum + stat.modifiedStat, 0),
    [chartData]
  );

  const netChange = useMemo(
    () => modifiedTotal - baseTotal,
    [modifiedTotal, baseTotal]
  );

  const handleAbilitySelect = useCallback(
    (abilityName: string) => {
      const abilityData = pokemon.abilities?.find(
        (a) => a.ability.name === abilityName
      );
      if (abilityData) {
        setSelectedAbility({
          name: abilityData.ability.name,
          isHidden: abilityData.is_hidden,
        });
      }
    },
    [pokemon.abilities]
  );

  const { ability } = useAbilityDetails(selectedAbility?.name || null);

  const selectedAbilityDescription = useMemo(() => {
    if (!ability?.effect_entries) return null;

    const englishEntry = ability.effect_entries.find(
      (entry) => entry.language.name === "en"
    );

    return englishEntry?.effect || null;
  }, [ability]);

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

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-medium text-gray-700">Select Ability:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities?.map((ability) => (
            <Button
              key={ability.ability.name}
              variant={
                selectedAbility?.name === ability.ability.name
                  ? "default"
                  : "outline"
              }
              size="sm"
              onClick={() => handleAbilitySelect(ability.ability.name)}
            >
              {ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)}
              {ability.is_hidden && (
                <span className="ml-1 text-xs opacity-70">(Hidden)</span>
              )}
            </Button>
          ))}
        </div>

        {selectedAbility && selectedAbilityDescription && (
          <Card className="mt-3 bg-blue-50">
            <CardContent className="p-3">
              <div className="flex flex-col items-start gap-2">
                <div className="font-medium text-black capitalize flex items-center gap-2">
                  {selectedAbility.name.replace("-", " ")}:
                  {selectedAbility.isHidden && (
                    <Badge variant="outline" className="text-xs">
                      Hidden
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {selectedAbilityDescription}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: 'Stat Value',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip
              content={<PokemonStatsTooltip selectedAbility={selectedAbility} />}
            />
            <Legend />
            <Bar dataKey="baseStat" fill="#3b82f6" name="Base Stat" />
            <Bar dataKey="modifiedStat" fill="#8b5cf6" name="Ability Modified" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
        <StatCard title="Base Total" value={baseTotal} variant="base" />
        <StatCard title="Modified Total" value={modifiedTotal} variant="modified" />
        <StatCard title="Net Change" value={netChange} variant="change" />
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-600 leading-relaxed">
          <strong>Note:</strong> Ability effects shown are theoretical maximums
          and may depend on battle conditions, status effects, weather, or other
          factors not represented in this chart. Hover over bars to see detailed
          stat information and ability effects.
        </div>
      </div>
    </Card>
  );
}
