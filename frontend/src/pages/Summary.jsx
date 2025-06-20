import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Summary() {
  const { id } = useParams();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get(`/report/summary/${id}`).then((res) => setSummary(res.data));
  }, [id]);

  if (!summary) return <p>Loading…</p>;

  const pieData = [
    { name: "Success", value: summary.successes },
    { name: "Failure", value: summary.failures },
  ];

  return (
    <div className="p-6">
      <Link to="/" className="underline">
        ← Back
      </Link>
      <h2 className="text-2xl font-bold mb-4">{summary.specName}</h2>

      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {pieData.map((_, idx) => (
            <Cell key={idx} fill={["#16a34a", "#dc2626"][idx]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <p className="mt-4">
        Total requests: <strong>{summary.total}</strong>
      </p>
    </div>
  );
}
