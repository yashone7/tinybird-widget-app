import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Amphibians", count: 2552 },
  { name: "Birds", count: 1455 },
  { name: "Crustaceans", count: 743 },
  { name: "Ferns", count: 281 },
  { name: "Arachnids", count: 251 },
  { name: "Corals", count: 232 },
  { name: "Algae", count: 98 },
];

function ThreatenedSpeciesChart() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Number of Threatened Species
      </h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="name" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f3f4f6",
                border: "none",
                borderRadius: "0.375rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              barSize={40}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ThreatenedSpeciesChart;
