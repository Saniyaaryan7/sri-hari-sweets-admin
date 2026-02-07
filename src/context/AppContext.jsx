import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  // ================= CAKES DATA =================
  const [cakes, setCakes] = useState([
    {
      id: 1,
      cakeId: "#sd897",
      name: "Butter Scotch 1 Pound",
      price: 768,
      strike: 876,
      img: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a",
      status: "Active",
    },
    {
      id: 2,
      cakeId: "IQ0001",
      name: "Kitkat and Gems cake",
      price: 599,
      strike: 699,
      img: "https://ukraineflora.com/upload/products/115/cake-happy-birthday.jpeg",
      status: "Active",
    },
  ]);


  
  // ================= ADD CAKE =================
  const addCake = (cakeData) => {
    setCakes((prev) => [
      ...prev,
      {
        ...cakeData,
        id: Date.now(), // random unique id generator
      },
    ]);
  };

  // ================= DELETE CAKE =================
  const deleteCake = (id) => {
    setCakes((prev) => prev.filter((cake) => cake.id !== id));
  };

  // ================= GET CAKE BY ID =================
  const getCakeById = (id) => {
    return cakes.find((cake) => cake.id === Number(id)); 
  };

// ================= UPDATE CAKE =================
 const updateCake = (updatedCake) => {
    setCakes((prev) =>
      prev.map((cake) =>
        cake.id === updatedCake.id ? updatedCake : cake
      )
    );
  };

   /* ================= CATEGORY ================= */
const [categories, setCategories] = useState([
  {
    id: 1,
    name: "Eggless Cake",
    superCategory: "Cakes",
    image: "",
    status: "Active",
  },
]);

const addCategory = (data) => {
  setCategories((prev) => [...prev, data]);
};


  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updatedCategory } : c
      )
    );
  };

/* ================= SUPER CATEGORY ================= */
const [superCategories, setSuperCategories] = useState([
  {
    id: 1,
    name: "Cakes",
    image: "https://tse1.mm.bing.net/th/id/OIP.tqyhr3Sva1luYASQYoGGhgAAAA",
    status: "Active",
  },
]);

const addSuperCategory = (data) => {
  setSuperCategories((prev) => [
    ...prev,
    { ...data, id: Date.now() },
  ]);
};

const deleteSuperCategory = (id) => {
  setSuperCategories((prev) =>
    prev.filter((sc) => sc.id !== id)
  );
};

const updateSuperCategory = (id, updatedData) => {
  setSuperCategories((prev) =>
    prev.map((sc) =>
      sc.id === id ? { ...sc, ...updatedData } : sc
    )
  );
};


  return (
    <AppContext.Provider
      value={{ cakes, addCake, deleteCake, getCakeById, updateCake,
         categories, addCategory, deleteCategory, updateCategory,
         superCategories, addSuperCategory, deleteSuperCategory, updateSuperCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


export const useAppContext = () => useContext(AppContext);
