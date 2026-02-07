import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

export default function Cakes() {
  const { cakes, deleteCake } = useAppContext(); 
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = cakes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id, cakeName) => {
    if (window.confirm(`Are you sure you want to delete "${cakeName}"?`)) {
      deleteCake(id);
    }
  };

  return (
    <div className="flex h-screen bg-[#EFE6E2] overflow-hidden">
      {/* Right */}
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-[#4B2E39]">
              Cakes
            </h1>

            <button
              onClick={() => navigate("/admin/cakes/add")}  // redirect to add cake page
              className="flex items-center gap-2 bg-[rgb(53,111,132)] hover:bg-[rgb(25,79,99)]
                         text-white px-4 py-2 rounded-full font-medium"
            >
              <Plus size={18} />
              Add New Cake
            </button>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">

            {/* Search */}
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by name or status"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-4 py-2 
                           text-sm bg-white
                           focus:outline-none focus:ring-2 focus:ring-[#1F4E5F]"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-3 px-3 text-left">Sr No.</th>
                    <th className="py-3 px-3 text-left">Cake ID</th>
                    <th className="py-3 px-3 text-left">Name</th>
                    <th className="py-3 px-3 text-left">Price</th>
                    <th className="py-3 px-3 text-left">Strike Price</th>
                    <th className="py-3 px-3 text-left">Image</th>
                    <th className="py-3 px-3 text-left">Status</th>
                    <th className="py-3 px-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody className="text-gray-800">
                  {filtered.map((cake, index) => (
                    <tr
                      key={cake.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3 px-3">{index + 1}</td>
                      <td className="py-3 px-3 font-medium">
                        {cake.cakeId}
                      </td>
                      <td className="py-3 px-3 font-medium">
                        {cake.name}
                      </td>
                      <td className="py-3 px-3">Rs. {cake.price}</td>
                      <td className="py-3 px-3">Rs. {cake.strike}</td>
                      <td className="py-3 px-3">
                        <img
                          src={cake.img}
                          alt=""
                          className="w-14 h-14 object-cover rounded-lg border"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                          ${
                            cake.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {cake.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">

                          {/* Edit */}
                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              navigate(`/admin/cakes/edit/${cake.id}`)
                            }
                            className="bg-transparent p-1 rounded-full
                                       text-emerald-500 hover:text-emerald-700
                                       hover:bg-emerald-50"
                          >
                            <Pencil size={18} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              handleDelete(cake.id, cake.name)
                            }
                            className="bg-transparent p-1 rounded-full
                                       text-red-500 hover:text-red-700
                                       hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-6 text-gray-500">
                        No cakes found
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
      </div>
    </div>
  );
}
