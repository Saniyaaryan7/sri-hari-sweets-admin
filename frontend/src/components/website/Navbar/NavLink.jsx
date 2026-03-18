import { NavLink } from "react-router-dom";


function NavLinks({ onClick }) {
  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-2
    px-4 py-2
    font-semibold tracking-wide
    rounded-full
    transition-all duration-300
    ${
      isActive
        ? "bg-red-500 text-white shadow-md scale-105"
        : "text-black hover:bg-red-500 hover:text-white shadow-md"
    }
    `;

  return (
    <>
      <NavLink to="/" onClick={onClick} className={linkClass}>
        Home
      </NavLink>

      <NavLink to="/about" onClick={onClick} className={linkClass}>
        About
      </NavLink>

      <NavLink to="/contact" onClick={onClick} className={linkClass}>
        Contact
      </NavLink>

     
      <NavLink to="/shop" onClick={onClick} className={linkClass}>
        Shop
      </NavLink>
    </>
  );
}

export default NavLinks;