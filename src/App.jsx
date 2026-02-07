import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import Login from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import Profile from "./Pages/website/Profile";
// layouts
import WebLayout from "./layouts/WebsiteLayout";
import AdminLayout from "./layouts/AdminLayout";

// website pages
import Home from "./Pages/website/Home";
import About from "./Pages/website/About";
import Contact from "./Pages/website/Contact";
import Category from "./Pages/website/Category";
import WebsiteProfile from "./Pages/website/Profile";

// admin pages
import Dashboard from "./Pages/admin/Dashboard";
import AdminProfile from "./Pages/admin/Profile";

// admin – Cake
import Cakes from "./Pages/admin/Cake/Cakes";
import AddCake from "./Pages/admin/Cake/AddCake";
import EditCake from "./Pages/admin/Cake/EditCake";

// admin – Category
import AdminCategory from "./Pages/admin/Category/category";
import AddCategory from "./Pages/admin/Category/AddCategory";
import EditCategory from "./Pages/admin/Category/EditCategory";

// admin – Super Category
import SuperCategory from "./Pages/admin/SuperCategory/superCategory";
import AddSuperCategory from "./Pages/admin/SuperCategory/AddSuperCategory";
import EditSuper from "./Pages/admin/SuperCategory/EditSuper";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
      <BrowserRouter>
        <Routes>

          {/* ROOT */}
          <Route path="/" element={<Navigate to="/app" replace />} />

          {/* LOGIN */}
          <Route path="/login" element={ <PublicRoute> <Login /> </PublicRoute>} />
          <Route path="/signup" element={  <PublicRoute>< SignUp /> </PublicRoute>} />
          
          {/* WEBSITE */}
          <Route path="/app" element={<WebLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Category />} />
            <Route path ="Profile" element={<Profile />} />

             <Route path="shop/category/:category" element={<Category />} />
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
          </Route>

        </Routes>
      </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
