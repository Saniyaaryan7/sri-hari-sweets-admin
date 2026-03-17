import { Outlet } from "react-router-dom";

import Navbar from "../components/website/Navbar/Navbar";
import Footer from "../components/website/Footer/Footer";

export default function WebLayout() {
  return (
    <div className="website min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
