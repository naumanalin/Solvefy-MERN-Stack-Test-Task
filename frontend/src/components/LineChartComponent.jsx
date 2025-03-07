import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { name: "Jan", Current: 30, Solar: 10 },
  { name: "Feb", Current: 50, Solar: 30 },
  { name: "Mar", Current: 40, Solar: 25 },
  { name: "Apr", Current: 80, Solar: 50 },
  { name: "May", Current: 60, Solar: 40 },
  { name: "Jun", Current: 90, Solar: 70 },
  { name: "Jul", Current: 70, Solar: 50 },
  { name: "Aug", Current: 60, Solar: 40 },
  { name: "Sep", Current: 80, Solar: 60 },
];

const LineChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f6a623" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f6a623" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#002147" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#002147" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fill: "#666" }} />
        <YAxis tick={{ fill: "#666" }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Current" stroke="#f6a623" fillOpacity={1} fill="url(#colorCurrent)" />
        <Area type="monotone" dataKey="Solar" stroke="#002147" fillOpacity={1} fill="url(#colorSolar)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
