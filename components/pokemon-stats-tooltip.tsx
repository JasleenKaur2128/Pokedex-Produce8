import { calculateAbilityEffect } from "@/lib/abilityEffects";
import { InfoIcon } from "lucide-react";

interface PokemonStatsTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    payload: {
      name: string;
      baseStat: number;
      modifiedStat: number;
    };
  }>;
  label?: string;
  selectedAbility: { name: string; isHidden: boolean } | null;
}

export function PokemonStatsTooltip({
  active,
  payload,
  label,
  selectedAbility,
}: PokemonStatsTooltipProps) {
  if (!active || !payload || !payload.length || !selectedAbility) {
    return null;
  }

  const data = payload[0].payload;
  const baseStat = data.baseStat;
  const modifiedStat = data.modifiedStat;
  const change = modifiedStat - baseStat;
  const percentageChange =
    baseStat > 0 ? ((change / baseStat) * 100).toFixed(1) : "0.0";

  const statName = label?.toLowerCase().replace(" ", "-") || "";
  const { effect } = calculateAbilityEffect(
    selectedAbility.name,
    statName,
    baseStat
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
      <div className="font-semibold text-gray-800 mb-2">{label}</div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-blue-600">Base:</span>
          <span className="font-medium">{baseStat}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-purple-600">Modified:</span>
          <span className="font-medium">{modifiedStat}</span>
        </div>

        {change !== 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Change:</span>
            <span
              className={`font-medium ${
                change > 0
                  ? "text-green-600"
                  : change < 0
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change} ({change > 0 ? "+" : ""}
              {percentageChange}%)
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          {effect === "No stat modification from this ability" && (
            <InfoIcon className="w-3 h-3" />
          )}
          <span>{effect}</span>
        </div>
      </div>
    </div>
  );
}
