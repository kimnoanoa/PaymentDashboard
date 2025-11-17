interface Props {
  title: string;
  value: string | number;
  color?: "red" | "default";
}

function StatCard({ title, value, color }: Props) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-5 transition hover:shadow-md">
      <div className="text-gray-500 text-sm">{title}</div>
      <div
        className={`text-2xl font-bold mt-2 ${
          color === "red" ? "text-red-600" : "text-gray-800"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default StatCard;
