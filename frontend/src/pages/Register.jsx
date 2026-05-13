import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Box,
  UserPlus,
} from "lucide-react";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/register",
        formData
      );

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white flex items-center justify-center px-4">

      {/* Background Glow Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-r border-white/10">

          <div className="flex items-center gap-3 mb-6">
            <Box size={42} className="text-emerald-400" />

            <h1 className="text-4xl font-bold">
              3D Viewer
            </h1>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">
            Create your account and start uploading, managing, and exploring immersive 3D experiences.
          </p>

          <div className="mt-10 flex gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-slate-400 mb-8">
            Join the future of interactive 3D model viewing.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 transition-all"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              <UserPlus size={18} />
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;