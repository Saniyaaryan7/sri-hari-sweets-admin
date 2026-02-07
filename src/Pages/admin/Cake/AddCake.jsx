import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AddCake() {
  const navigate = useNavigate();
  const { addCake } = useContext(AppContext);

  const [fileName, setFileName] = useState("No file chosen");

  //  form data [empty data]
  const [formData, setFormData] = useState({
    cakeId: "",
    name: "",
    superCategory: "",
    category: "",
    price: "",
    strike: "",
    image: "",
  });

  //  common change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  image handler
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  //  save cake
  const handleSave = () => {
    addCake(formData);          // context = save
    navigate("/admin/cakes");   // this page = redirect to cakes list
  };

  return (
    <div className="flex h-screen bg-[#EFE6E2] overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-[#4B2E39]">
              Add Cake
            </h1>
            <p className="text-sm text-gray-500">
              Fill all information below
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Cake ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cake ID
                </label>
                <input
                  type="text"
                  name="cakeId"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                />
              </div>

              {/* Cake Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cake Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                />
              </div>

              {/* Super Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Super Category
                </label>
                <select
                  name="superCategory"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                >
                  <option value="">Super Category</option>
                  <option value="Cakes">Cakes</option>
                  <option value="Chocolates">Chocolates</option>
                  <option value="Happy Birthday">Happy Birthday</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                >
                  <option value="">Category</option>
                  <option value="Eggless">Eggless</option>
                  <option value="With Egg">With Egg</option>
                  <option value="Premium">Premium Cakes</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                />
              </div>

              {/* Strike Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strike Price
                </label>
                <input
                  type="number"
                  name="strike"
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>

                <div className="flex items-center gap-4 border rounded-lg px-3 py-2">
                  <input
                    type="file"
                    id="cakeImage"
                    className="hidden"
                    onChange={handleImageChange}  //here we are handling image change to update file name and image preview
                  />

                  <label
                    htmlFor="cakeImage"
                    className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md text-sm"
                  >
                    Choose File
                  </label>

                  <span className="text-sm text-gray-500 truncate">
                    {fileName}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="bg-[rgb(53,111,132)] text-white px-6 py-2 rounded-lg text-sm font-medium"
              >
                Save Cake
              </button>

              <button
                onClick={() => navigate("/admin/cakes")}
                className="border px-6 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
