import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";
import MessageModal from "../../../components/admin/MessageModal";

export default function AddCake() {
  const navigate = useNavigate();
  const { addCake, uploadImage, categories, superCategories } = useAppContext();

  const [fileName, setFileName] = useState("No file chosen");
  const [imageFile, setImageFile] = useState(null);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: ""
  });

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
      const file = e.target.files[0];
      setFileName(file.name);
      setImageFile(file);
      setFormData({
        ...formData,
        image: URL.createObjectURL(file), // Preview
      });
    } else {
      setFileName("No file chosen");
      setImageFile(null);
    }
  };

  //  save cake
  const handleSave = async () => {
    if (!formData.name) {
      setModal({
        isOpen: true,
        type: "error",
        title: "Missing Name",
        message: "Cake name is required"
      });
      return;
    }

    let finalImageUrl = formData.image;

    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch (error) {
        setModal({
          isOpen: true,
          type: "error",
          title: "Upload Failed",
          message: "Image upload failed. Please try again."
        });
        return;
      }
    }

    addCake({ ...formData, image: finalImageUrl });
    navigate("/admin/cakes");
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
                  value={formData.cakeId}
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
                  value={formData.name}
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
                  value={formData.superCategory}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                >
                  <option value="">Select Super Category</option>
                  {superCategories.map((sc) => (
                    <option key={sc.id} value={sc.name}>{sc.name}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 text-sm bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
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

      <MessageModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
}
