import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://consultancy-sea9.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/admin-dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-12 h-12 text-indigo-600 mb-2" />
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Admin Login</h2>
          <p className="text-sm text-gray-500">Please enter your credentials to proceed</p>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm mt-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="mt-6">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mt-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full mt-1 p-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl text-white font-semibold text-lg transition duration-300 ${
            loading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>
      </motion.div>
    </div>
  );
}
