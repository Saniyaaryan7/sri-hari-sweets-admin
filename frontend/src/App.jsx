import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import React, { Suspense, lazy } from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// Lazy-loaded components
const Login = lazy(() => import("./Pages/auth/SignIn"));
const SignUp = lazy(() => import("./Pages/auth/SignUp"));
const Profile = lazy(() => import("./Pages/website/Profile"));
const WebLayout = lazy(() => import("./layouts/WebsiteLayout"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));

const Home = lazy(() => import("./Pages/website/Home"));
const About = lazy(() => import("./Pages/website/About"));
const ProductDetails = lazy(() => import("./Pages/website/ProductDetails"));
const Contact = lazy(() => import("./Pages/website/Contact"));
const Category = lazy(() => import("./Pages/website/Category"));
const WebsiteProfile = lazy(() => import("./Pages/website/Profile"));
const Cart = lazy(() => import("./Pages/website/Cart"));
const Checkout = lazy(() => import("./Pages/website/Checkout"));
const OrderTracking = lazy(() => import("./Pages/website/OrderTracking"));

const Dashboard = lazy(() => import("./Pages/admin/Dashboard"));
const AdminProfile = lazy(() => import("./Pages/admin/Profile"));
const ChangePassword = lazy(() => import("./Pages/admin/ChangePassword"));

const Cakes = lazy(() => import("./Pages/admin/Cake/Cakes"));
const AddCake = lazy(() => import("./Pages/admin/Cake/AddCake"));
const EditCake = lazy(() => import("./Pages/admin/Cake/EditCake"));

const AdminCategory = lazy(() => import("./Pages/admin/Category/category"));
const AddCategory = lazy(() => import("./Pages/admin/Category/AddCategory"));
const EditCategory = lazy(() => import("./Pages/admin/Category/EditCategory"));

const SuperCategory = lazy(() => import("./Pages/admin/SuperCategory/superCategory"));
const AddSuperCategory = lazy(() => import("./Pages/admin/SuperCategory/AddSuperCategory"));
const EditSuper = lazy(() => import("./Pages/admin/SuperCategory/EditSuper"));

const HeroManagement = lazy(() => import("./Pages/admin/Website/HeroManagement"));
const GalleryManagement = lazy(() => import("./Pages/admin/Website/GalleryManagement"));
const MessagesView = lazy(() => import("./Pages/admin/Website/MessagesView"));
const SpecialitiesManagement = lazy(() => import("./Pages/admin/Website/SpecialitiesManagement"));
const ContactManagement = lazy(() => import("./Pages/admin/Website/ContactManagement"));
const AboutManagement = lazy(() => import("./Pages/admin/Website/AboutManagement"));
const OrderManagement = lazy(() => import("./Pages/admin/Orders/OrderManagement"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* LOGIN */}
            <Route path="/login" element={ <PublicRoute> <Login /> </PublicRoute>} />
            <Route path="/signup" element={  <PublicRoute>< SignUp /> </PublicRoute>} />
            
            {/* WEBSITE */}
            <Route path="/" element={<WebLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="shop" element={<Category />} />
              <Route path ="Profile" element={<Profile />} />

               <Route path="shop/category/:category" element={<Category />} />
               <Route path="product/:id" element={<ProductDetails />} />
               <Route path="cart" element={<ProtectedRoute role="user"><Cart /></ProtectedRoute>} />
               <Route path="checkout" element={<ProtectedRoute role="user"><Checkout /></ProtectedRoute>} />
               <Route path="orders" element={<ProtectedRoute role="user"><OrderTracking /></ProtectedRoute>} />
               <Route path="profile" element={ 
                <ProtectedRoute role="user">
                  <WebsiteProfile />
                </ProtectedRoute>
    }
  />
            </Route>

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >

              <Route index element={<Dashboard />} />

              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="change-password" element={<ChangePassword />} />

              {/* CAKES */}
              <Route path="cakes" element={<Cakes />} />
              <Route path="cakes/add" element={<AddCake />} />
              <Route path="cakes/edit/:id" element={<EditCake />} />

              {/* CATEGORY */}
              <Route path="category" element={<AdminCategory />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="category/edit/:id" element={<EditCategory />} />

              {/* SUPER CATEGORY */}
              <Route path="super-category" element={<SuperCategory />} />
              <Route path="super-category/add" element={<AddSuperCategory />} />
              <Route path="super-category/edit/:id" element={<EditSuper />} />

              {/* WEBSITE MANAGEMENT */}
              <Route path="hero" element={<HeroManagement />} />
              <Route path="gallery" element={<GalleryManagement />} />
              <Route path="messages" element={<MessagesView />} />
              <Route path="specialities" element={<SpecialitiesManagement />} />
              <Route path="contact" element={<ContactManagement />} />
              <Route path="about" element={<AboutManagement />} />
              <Route path="orders" element={<OrderManagement />} />
            </Route>

          </Routes>
        </Suspense>
      </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
