import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const API_URL = "http://localhost:5000/api";

export function AppProvider({ children }) {
  const [cakes, setCakes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [superCategories, setSuperCategories] = useState([]);
  const [hero, setHero] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    address: "",
    phone: "",
    email: "",
    socials: {
      facebook: "",
      pinterest: "",
      twitter: "",
      instagram: "",
      whatsapp: ""
    }
  });
  const [aboutContent, setAboutContent] = useState(null);
  const [cart, setCart] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  // ================= FETCH ALL DATA =================
  useEffect(() => {
    fetchCakes();
    fetchCategories();
    fetchSuperCategories();
    fetchHero();
    fetchGallery();
    fetchMessages();
    fetchSpecialities();
    fetchContactInfo();
    fetchAboutContent();
    fetchAllOrders();
    fetchUsers();
  }, []);

  const fetchCakes = async () => {
    try {
      const res = await axios.get(`${API_URL}/cakes`);
      setCakes(res.data);
    } catch (error) {
      console.error("Error fetching cakes:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSuperCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/supercategories`);
      setSuperCategories(res.data);
    } catch (error) {
      console.error("Error fetching supercategories:", error);
    }
  };

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${API_URL}/hero`);
      setHero(res.data);
    } catch (error) {
      console.error("Error fetching hero slides:", error);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      setGallery(res.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/messages`);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchSpecialities = async () => {
    try {
      const res = await axios.get(`${API_URL}/specialities`);
      setSpecialities(res.data);
    } catch (error) {
      console.error("Error fetching specialities:", error);
    }
  };

  const fetchContactInfo = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact`);
      setContactInfo(res.data);
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  const fetchAboutContent = async () => {
    try {
      const res = await axios.get(`${API_URL}/about`);
      setAboutContent(res.data);
    } catch (error) {
      console.error("Error fetching about content:", error);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/cart`, { headers: { 'user-id': userId } });
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/orders/user`, { headers: { 'user-id': userId } });
      setUserOrders(res.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/admin`);
      setAllOrders(res.data);
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ================= CAKES CRUD =================
  const addCake = async (cakeData) => {
    try {
      const res = await axios.post(`${API_URL}/cakes`, cakeData);
      setCakes((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding cake:", error);
    }
  };

  const deleteCake = async (id) => {
    try {
      await axios.delete(`${API_URL}/cakes/${id}`);
      setCakes((prev) => prev.filter((cake) => String(cake.id) !== String(id)));
    } catch (error) {
      console.error("Error deleting cake:", error);
    }
  };

  const getCakeById = (id) => {
    return cakes.find((cake) => cake.id === Number(id)); 
  };

  const updateCake = async (updatedCake) => {
    try {
      const res = await axios.put(`${API_URL}/cakes/${updatedCake.id}`, updatedCake);
      setCakes((prev) =>
        prev.map((cake) => (String(cake.id) === String(updatedCake.id) ? res.data : cake))
      );
    } catch (error) {
      console.error("Error updating cake:", error);
    }
  };

  // ================= CATEGORY CRUD =================
  const addCategory = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/categories`, data);
      setCategories((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const res = await axios.put(`${API_URL}/categories/${id}`, updatedCategory);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // ================= SUPER CATEGORY CRUD =================
  const addSuperCategory = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/supercategories`, data);
      setSuperCategories((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding supercategory:", error);
    }
  };

  const deleteSuperCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/supercategories/${id}`);
      setSuperCategories((prev) => prev.filter((sc) => sc.id !== id));
    } catch (error) {
      console.error("Error deleting supercategory:", error);
    }
  };

  const updateSuperCategory = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/supercategories/${id}`, updatedData);
      setSuperCategories((prev) =>
        prev.map((sc) => (sc.id === id ? res.data : sc))
      );
    } catch (error) {
      console.error("Error updating supercategory:", error);
    }
  };

  // ================= HERO CRUD =================
  const addHero = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/hero`, data);
      setHero((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding hero slide:", error);
    }
  };

  const updateHero = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/hero/${id}`, data);
      setHero((prev) => prev.map((item) => (item.id === id ? res.data : item)));
    } catch (error) {
      console.error("Error updating hero slide:", error);
    }
  };

  const deleteHero = async (id) => {
    try {
      await axios.delete(`${API_URL}/hero/${id}`);
      setHero((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting hero slide:", error);
    }
  };

  // ================= GALLERY CRUD =================
  const addGalleryImage = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/gallery`, data);
      setGallery((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding gallery image:", error);
    }
  };

  const deleteGalleryImage = async (id) => {
    try {
      await axios.delete(`${API_URL}/gallery/${id}`);
      setGallery((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting gallery image:", error);
    }
  };

  // ================= SPECIALITIES CRUD =================
  const addSpeciality = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/specialities`, data);
      setSpecialities((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error adding speciality:", error);
    }
  };

  const updateSpeciality = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/specialities/${id}`, data);
      setSpecialities((prev) => prev.map((item) => (item.id === id ? res.data : item)));
    } catch (error) {
      console.error("Error updating speciality:", error);
    }
  };

  const deleteSpeciality = async (id) => {
    try {
      await axios.delete(`${API_URL}/specialities/${id}`);
      setSpecialities((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting speciality:", error);
    }
  };

  // ================= CONTACT INFO =================
  const updateContactInfo = async (data) => {
    try {
      const res = await axios.put(`${API_URL}/contact`, data);
      setContactInfo(res.data);
    } catch (error) {
      console.error("Error updating contact info:", error);
    }
  };

  const updateAboutContent = async (data) => {
    try {
      const res = await axios.put(`${API_URL}/about`, data);
      setAboutContent(res.data);
    } catch (error) {
      console.error("Error updating about content:", error);
    }
  };

  // ================= CART MANAGEMENT =================
  const syncCartWithBackend = async (userId, items) => {
    try {
      await axios.put(`${API_URL}/cart`, { items }, { headers: { 'user-id': userId } });
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addToCart = (userId, product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      } else {
        newCart = [...prev, { ...product, quantity }];
      }
      syncCartWithBackend(userId, newCart);
      return newCart;
    });
  };

  const removeFromCart = (userId, productId) => {
    setCart((prev) => {
      const newCart = prev.filter(item => item.id !== productId);
      syncCartWithBackend(userId, newCart);
      return newCart;
    });
  };

  const updateCartQty = (userId, productId, qty) => {
    setCart((prev) => {
      const newCart = prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, qty) } : item);
      syncCartWithBackend(userId, newCart);
      return newCart;
    });
  };

  // ================= ORDER MANAGEMENT =================
  const placeOrder = async (userId, orderData) => {
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData, { headers: { 'user-id': userId } });
      setUserOrders(prev => [...prev, res.data]);
      setCart([]); // Backend clears it too
      return { success: true, order: res.data };
    } catch (error) {
      console.error("Error placing order:", error);
      return { success: false };
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    console.log(`[AppContext] Updating orderId: ${orderId} (${typeof orderId}) to status: ${status}`);
    try {
      const res = await axios.put(`${API_URL}/orders/${orderId}/status`, { status });
      console.log("[AppContext] Status update response:", res.data);
      const updatedOrder = res.data;
      
      // Update local state with type-agnostic ID matching
      setAllOrders(prev => prev.map(o => String(o.id) === String(orderId) ? updatedOrder : o));
      setUserOrders(prev => prev.map(o => String(o.id) === String(orderId) ? updatedOrder : o));
      
      return { success: true, data: updatedOrder };
    } catch (error) {
      console.error("[AppContext] Error updating order status:", error.response?.data || error.message);
      return { success: false, error: error.response?.data?.message || error.message };
    }
  };

  const cancelOrder = async (orderId) => {
    console.log("[AppContext] cancelOrder request for:", orderId);
    if (!window.confirm("Are you sure you want to cancel this order?")) return { success: false };
    
    const result = await updateOrderStatus(orderId, "Cancelled");
    if (result.success) {
      console.log("[AppContext] successfully cancelled order:", orderId);
      // Explicitly refresh user orders to guarantee UI sync
      const userId = userOrders.find(o => String(o.id) === String(orderId))?.userId;
      if (userId) fetchUserOrders(userId); 
    } else {
      alert(`Cancellation failed: ${result.error}`);
    }
    return result;
  };

  // ================= MESSAGE CRUD =================
  const addMessage = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/messages`, data);
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${API_URL}/messages/${id}`);
      setMessages((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const sendReply = async (replyData) => {
    try {
      const response = await axios.post(`${API_URL}/messages/reply`, replyData);
      if (response.data.success) {
        setMessages((prev) => 
          prev.map((msg) => 
            String(msg.id) === String(replyData.id) 
              ? { ...msg, reply: { message: replyData.replyMessage, sentAt: new Date().toISOString() } } 
              : msg
          )
        );
      }
      return response.data;
    } catch (error) {
      console.error("Error sending reply:", error);
      throw error;
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.path;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        cakes, addCake, deleteCake, getCakeById, updateCake,
        categories, addCategory, deleteCategory, updateCategory,
        superCategories, addSuperCategory, deleteSuperCategory, updateSuperCategory,
        hero, addHero, updateHero, deleteHero,
        gallery, addGalleryImage, deleteGalleryImage,
        messages, addMessage, deleteMessage, sendReply,
        users, fetchUsers,
        specialities, addSpeciality, updateSpeciality, deleteSpeciality,
        contactInfo, updateContactInfo,
        aboutContent, updateAboutContent,
        cart, setCart, fetchCart, addToCart, removeFromCart, updateCartQty,
        userOrders, setUserOrders, fetchUserOrders, placeOrder,
        allOrders, fetchAllOrders, updateOrderStatus, cancelOrder,
        uploadImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
