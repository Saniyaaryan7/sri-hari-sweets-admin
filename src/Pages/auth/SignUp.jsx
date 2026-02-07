import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
}


    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const alreadyExists = users.find((u) => u.email === email);
      if (alreadyExists) {
        setError("User already exists, please login");
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: "user",
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // auto login after signup
      login(newUser);
      navigate("/app", { replace: true });

      setLoading(false);
    }, 1000);
  };

  return (
    <main className="fixed inset-0 bg-gradient-to-br from-pink-300 via-rose-200 to-purple-300 flex items-center justify-center">
      <section className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Sri Hari Sweets</h1>
          <p className="text-sm text-white/90 mt-1">Create your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="px-6 py-8 space-y-4">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-gray-100
                       placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-gray-100
                       placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 pr-14 rounded-full bg-gray-100
                         placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-pink-500 hover:text-pink-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
<div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full px-5 py-3 pr-14 rounded-full bg-gray-100
               placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
  />
  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2
               text-pink-500 hover:text-pink-700"
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-500
                       text-white py-3 rounded-full font-semibold"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 font-semibold">
              Login
            </Link>
          </p>

        </form>
      </section>
    </main>
  );
}
