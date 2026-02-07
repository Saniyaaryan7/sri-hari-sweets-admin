import React from "react";
import SalesChart from "../../components/admin/saleschart";
import {
  ShoppingBag,
  Cake,
  IndianRupee,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Orders", value: "245", icon: ShoppingBag, bg: "bg-[#EAF4F6]" },
    { title: "Products", value: "38", icon: Cake, bg: "bg-[#FDF1EC]" },
    { title: "Revenue", value: "₹1,24,500", icon: IndianRupee, bg: "bg-[#F3EFEA]" },
    { title: "Users", value: "120", icon: Users, bg: "bg-[#EEF2F3]" },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#EFE6E2]">

      <h1 className="text-2xl font-semibold text-[#4B2E39] mb-6">
        Hello Admin
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl p-5 flex gap-4 items-center"
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${card.bg}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold text-[#4B2E39]">
                  {card.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <section className="my-8">
        <SalesChart />
      </section>

    </main>
  );
}
