import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface StatCardProps {
  title: string;
  value: number;
  variant: "base" | "modified" | "change";
}

const getVariantStyles = (variant: StatCardProps["variant"]) => {
  switch (variant) {
    case "base":
      return "bg-blue-50 text-blue-800";
    case "modified":
      return "bg-purple-50 text-purple-800";
    case "change":
      return "bg-gray-50 text-gray-800";
    default:
      return "bg-gray-50 text-gray-800";
  }
};

const getValueStyles = (value: number, variant: StatCardProps["variant"]) => {
  if (variant === "change") {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
  }
  return "";
};

export function StatCard({ title, value, variant }: StatCardProps) {
  const formatValue = () => {
    if (variant === "change" && value > 0) {
      return `+${value}`;
    }
    return value.toString();
  };

  return (
    <Card className={getVariantStyles(variant)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className={`text-xl font-bold text-center ${getValueStyles(
            value,
            variant
          )}`}
        >
          {formatValue()}
        </div>
      </CardContent>
    </Card>
  );
}
