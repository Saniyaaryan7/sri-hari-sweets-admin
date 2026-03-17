import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login to view your profile
      </div>
    );
  }

  // admin redirect
  if (user.role === "admin") {
    navigate("/admin/profile", { replace: true });
    return null;
  }

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      password: newPassword ? newPassword : user.password,
    };

    // update logged in user
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // update users list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setEditing(false);
    setNewPassword("");
    setConfirmPassword("");
    window.location.reload();
  };

  return (
   <main className="min-h-screen bg-[#fffdf9] flex items-center justify-center px-4 pt-28 pb-8">

      <section className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-2xl font-serif font-bold text-center text-gray-800">
          My Account
        </h1>
        <p className="text-center text-sm text-gray-500 mt-1">
          Manage your profile & password
        </p>

        <div className="mt-8 space-y-5">

         {/* NAME */}
<div>
  <label className="text-sm text-gray-500">Full Name</label>
  {editing ? (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100
                 focus:ring-2 focus:ring-rose-400 outline-none"
    />
  ) : (
    <p className="mt-1 px-4 py-3 bg-gray-100 rounded-xl">
      {user.name}
    </p>
  )}
</div>

{/* EMAIL */}
<div>
  <label className="text-sm text-gray-500">Email</label>
  {editing ? (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100
                 focus:ring-2 focus:ring-rose-400 outline-none"
    />
  ) : (
    <p className="mt-1 px-4 py-3 bg-gray-100 rounded-xl">
      {user.email}
    </p>
  )}
</div>


          {/* PASSWORD (ONLY IN EDIT MODE) */}
          {editing && (
            <>
              <div>
                <label className="text-sm text-gray-500">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100
                             focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-gray-100
                             focus:ring-2 focus:ring-rose-400 outline-none"
                />
              </div>
            </>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-4">
            {editing ? (
              <button
                onClick={handleSave}
                className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-semibold"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex-1 border border-rose-500 text-rose-500
                           py-3 rounded-xl font-semibold"
              >
                Edit Profile
              </button>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
