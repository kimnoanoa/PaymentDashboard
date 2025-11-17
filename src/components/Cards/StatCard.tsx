interface Props {
  title: string;
  value: string | number;
  color?: "red" | "yellow" | "default";   // yellow 추가
}

function StatCard({ title, value, color = "default" }: Props) {
  const colorClass =
    color === "red"
      ? "text-red-600"
      : color === "yellow"
      ? "text-yellow-600"
      : "text-gray-900";

  return (
    <div
      className="
        bg-white 
        rounded-lg 
        p-5 
        border 
        border-gray-200 
        shadow-sm 
        hover:shadow 
        transition
      "
    >
      {/* Title */}
      <p className="text-sm text-gray-500 font-medium">{title}</p>

      {/* Value */}
      <p className={`mt-2 text-3xl font-bold ${colorClass}`}>
        {value}
      </p>
    </div>
  );
}

export default StatCard;
