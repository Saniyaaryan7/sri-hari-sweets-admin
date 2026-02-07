import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

export default function Category() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔥 CONTEXT SE DATA
  const { categories, deleteCategory } = useAppContext();

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}" ?`)) {
      deleteCategory(id);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#EFE6E2]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#4B2E39]">
          CATEGORY
        </h1>

        <button
          onClick={() => navigate("/admin/category/add")}
          className="flex items-center gap-2
                     bg-[rgb(53,111,132)] hover:bg-[rgb(25,79,99)]
                     text-white px-5 py-2 rounded-full text-sm font-medium"
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        {/* Search */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm
                       focus:ring-2 focus:ring-[#1F4E5F] focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Sr.No.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Super Category</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium">{item.name}</td>
                  <td className="py-4 px-4">{item.superCategory}</td>
                  <td className="py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                        ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        title="Edit"
                        onClick={() =>
                          navigate(`/admin/category/edit/${item.id}`)
                        }
                        className="text-emerald-500 hover:bg-emerald-50 p-1 rounded-full"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() =>
                          handleDelete(item.id, item.name)
                        }
                        className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No category found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Showing 1 to {filtered.length} of {filtered.length} rows
        </p>
      </div>
    </main>
  );
}
