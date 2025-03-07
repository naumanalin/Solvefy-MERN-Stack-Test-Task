import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const data = [
  { name: "Completed", value: 45 },
  { name: "Remaining", value: 55 },
];

const COLORS = ["#f6a623", "#002147"]; // Orange and Dark Blue

const PieChartComponent = () => {
  return (
    <div className="relative flex flex-col items-center">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45} // Adjust for donut effect
          outerRadius={60}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          {/* Center Label for Percentage */}
          <Label
            value="45%"
            position="center"
            fill="#000"
            fontSize={20}
            fontWeight="bold"
          />
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
