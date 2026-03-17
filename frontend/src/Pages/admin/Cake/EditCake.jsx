import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import MessageModal from "../../../components/admin/MessageModal";

export default function EditCake() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cakes, updateCake, uploadImage, categories, superCategories } = useAppContext();

  const [fileName, setFileName] = useState("No file chosen");
  const [imageFile, setImageFile] = useState(null);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: ""
  });

  const [formData, setFormData] = useState({
    id: "",
    cakeId: "",
    name: "",
    superCategory: "",
    category: "",
    price: "",
    strike: "",
    status: "Active",
    image: "",
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const cake = cakes.find((c) => String(c.id) === String(id));
    if (cake) {
      setFormData(cake);
    }
  }, [id, cakes]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setImageFile(file);
      setFormData({
        ...formData,
        image: URL.createObjectURL(file), // Preview
      });
    }
  };

  // submit updated cake
  const handleSubmit = async () => {
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

    updateCake({ ...formData, image: finalImageUrl });
    navigate("/admin/cakes");
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA] overflow-hidden">  
      <div className="flex flex-col flex-1">                
        <main className="flex-1 overflow-y-auto px-8 py-6">

          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-gray-800">
              EDIT CAKE
            </h1>
            <span className="text-sm text-gray-500">Edit Cake</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Basic Information
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill all information below
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cake ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cake Id
                </label>
                <input
                  type="text"
                  name="cakeId"
                  value={formData.cakeId}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 bg-white text-gray-800 text-sm"
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
                  className="w-full border rounded-md px-4 py-2 bg-white text-gray-800 text-sm"
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
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white text-gray-800"
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
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white text-gray-800"
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
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white text-gray-800"
                />
              </div>

              {/* Strike */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Strike Price
                </label>
                <input
                  type="number"
                  name="strike"
                  value={formData.strike}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white text-gray-800"
                />
              </div>

              {/* Image */}
              <div className="flex items-center gap-4">
                <img
                  src={formData.image}
                  alt="Cake"
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="flex border rounded-md overflow-hidden">
                  <label className="px-4 py-2 bg-gray-100 text-sm cursor-pointer border-r">
                    Choose File
                    <input type="file" hidden onChange={handleFileChange} />
                  </label>
                  <span className="px-4 py-2 text-sm text-gray-500">
                    {fileName}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-md px-4 py-2 text-sm bg-white text-gray-800"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                className="bg-[rgb(53,111,132)] hover:bg-[rgb(25,79,99)] text-white
                           px-6 py-2 rounded-md text-sm font-medium"
              >
                Save Changes
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
