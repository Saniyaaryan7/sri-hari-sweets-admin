import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useAppContext } from "../../context/AppContext";

export default function SalesChart() {
  const { allOrders } = useAppContext();

  // Process last 7 days of sales
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      name: days[d.getDay()],
      dateStr: d.toISOString().split('T')[0],
      sales: 0
    };
  }).reverse();

  allOrders.forEach(order => {
    if (order.status === "Cancelled" || !order.createdAt) return;
    const orderDate = order.createdAt.split('T')[0];
    const dayMatch = last7Days.find(d => d.dateStr === orderDate);
    if (dayMatch) {
      dayMatch.sales += Number(order.total) || 0;
    }
  });

  const chartData = last7Days.map(({ name, sales }) => ({ name, sales }));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#4B2E39] mb-4">
        Weekly Sales
      </h2>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#1F4E5F"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
