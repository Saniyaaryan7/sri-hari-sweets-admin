import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { categories, updateCategory } = useAppContext();

  const [fileName, setFileName] = useState("No file chosen");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    superCategory: "",
    status: "Active",
    image: "",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const category = categories.find((c) => c.id === Number(id));
    if (category) {
      setFormData(category);
    }
  }, [id, categories]);

  const handleChange = (e) => {  // For name, superCategory and status
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {       
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFormData({
        ...formData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  /* ================= SAVE ================= */
  const handleSubmit = () => {      
  updateCategory(formData.id, formData);
  navigate("/admin/category");
};

  return (
    <div className="flex h-screen bg-[#F5F6FA] overflow-hidden">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto px-8 py-6">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              EDIT CATEGORY
            </h1>
            <span className="text-sm text-gray-500">Edit Category</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Basic Information
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill all information below
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Super Category
                </label>
                <input
                  type="text"
                  name="superCategory"
                  value={formData.superCategory}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>

                <div className="flex items-center gap-4">
                  <img
                    src={formData.image}
                    alt=""
                    className="w-20 h-20 rounded-md object-cover border"
                  />

                  <div className="flex border rounded-md overflow-hidden">
                    <label className="px-4 py-2 bg-gray-100 cursor-pointer border-r">
                      Choose File
                      <input type="file" hidden onChange={handleFileChange} />
                    </label>
                    <span className="px-4 py-2 text-sm text-gray-500">
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-[rgb(53,111,132)] hover:bg-[rgb(25,79,99)]
                           text-white px-6 py-2 rounded-md text-sm font-medium"
              >
                Save Changes
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
