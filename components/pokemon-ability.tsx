import { Badge } from '@/components/ui/badge';
import { useAbilityDetails } from '@/hooks/use-ability-details';

interface PokemonAbilityProps {
  abilityName: string;
  isHidden?: boolean;
}

export function PokemonAbility({ abilityName, isHidden }: PokemonAbilityProps) {
  const { ability, isLoading, error } = useAbilityDetails(abilityName);

  if (isLoading) return <p className="text-sm text-gray-600">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">Failed to load ability</p>;

  const description = ability?.effect_entries?.find(e => e.language.name === "en")?.effect;

  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Badge variant={isHidden ? "destructive" : "default"} className="text-xs capitalize">
          {abilityName}
        </Badge>
        {isHidden && <Badge variant="outline" className="text-xs">Hidden</Badge>}
      </div>
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </li>
  );
}