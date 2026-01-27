/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    if (!email || !password) {
      return setShowError(true);
    }

    const res = await login({ email, password });
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error(error.message || "An error occurred");
    }
    toast.success("Login success!");
    navigate("/dashboard");
  };

  const setDemoLoginCreds = () => {
    setEmail("demo@gmail.com");
    setPassword("demo12345");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome back</h1>

        <div className="mb-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Email"
          />
          {showError && !email && (
            <p className="text-red-500 font-semibold text-sm">
              This field is required.
            </p>
          )}
        </div>

        <div className="mb-5">
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Password"
          />
          {showError && !password && (
            <p className="text-red-500 font-semibold text-sm">
              This field is required.
            </p>
          )}
        </div>

        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 transition"
        >
          Login
        </button>

        <button
          onClick={setDemoLoginCreds}
          className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Demo Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          No account?{" "}
          <Link
            to="/register"
            className="text-teal-600 cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
