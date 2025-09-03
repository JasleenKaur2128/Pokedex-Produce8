import { formatStatsName } from "@/lib/pokemon-utils";
import { Pokemon } from "@/types/pokemon";
import { Progress } from "@radix-ui/react-progress";

interface PokemonBaseStatsProps {
  pokemon: Pokemon;
}

export function PokemonBaseStats({ pokemon }: PokemonBaseStatsProps) {
  return (
    <section>
      <h3 className="font-medium text-gray-700 mt-4 mb-4">Base Stats</h3>
      <div className="flex flex-col gap-4">
        {pokemon.stats?.map((s) => (
          <div key={s.stat.name} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">
                {formatStatsName(s.stat.name)}
              </span>
              <span className="font-bold text-gray-800">{s.base_stat}</span>
            </div>
            <Progress
              value={(s.base_stat / 255) * 100}
              className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200"
            >
              <div
                className="h-full bg-black"
                style={{ width: `${(s.base_stat / 255) * 100}%` }}
              />
            </Progress>
          </div>
        ))} 
      </div>
    </section>
  );
}
