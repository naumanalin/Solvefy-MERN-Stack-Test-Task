import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const data = [
  { name: "JAN", "2019": 20, "2020": 10 },
  { name: "FEB", "2019": 35, "2020": 15 },
  { name: "MAR", "2019": 40, "2020": 20 },
  { name: "APR", "2019": 10, "2020": 25 },
  { name: "MAY", "2019": 30, "2020": 25 },
  { name: "JUNE", "2019": 50, "2020": 30 },
  { name: "JULY", "2019": 15, "2020": 35 },
  { name: "AUG", "2019": 20, "2020": 20 },
  { name: "SEP", "2019": 25, "2020": 30 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 text-white p-2 rounded-md shadow-md text-sm">
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fill: "#666" }} />
        <YAxis tick={{ fill: "#666" }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="2019" fill="#002147" barSize={20} />
        <Bar dataKey="2020" fill="#f6a623" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
