import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //  Redirect if already logged in
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    }

    if (user.role === "user") {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // ADMIN LOGIN
      if (email === "admin@gmail.com" && password === "admin123") {
        const adminUser = {
          id: 1,
          name: "Admin",
          email,
          role: "admin",
        };

        login(adminUser);
        setLoading(false);
        navigate("/admin", { replace: true });
        return;
      }

      // USER LOGIN
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const normalUser = {
          ...foundUser,
          role: "user",
        };

        login(normalUser);
        setLoading(false);
        navigate("/app", { replace: true });
        return;
      }

      setError("Invalid email or password");
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 via-rose-200 to-purple-300 flex items-center justify-center px-4">
      <section className="w-[360px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-500 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Sri Hari Sweets</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="px-6 py-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 text-center">
            Welcome Back
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-gray-100
                       placeholder-pink-400 focus:ring-2 focus:ring-pink-400 outline-none"
          />

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
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-500
                       text-white py-3 rounded-full font-semibold disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-center text-gray-500">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-pink-600 font-semibold cursor-pointer"
            >
              Create account
            </span>
          </p>

          <p className="text-xs text-center text-gray-400">
            Admin → admin@gmail.com / admin123
          </p>
        </form>
      </section>
    </main>
  );
}
