/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassord, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const [register] = useRegisterMutation();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassord || password !== confirmPassord) {
      return setShowError(true);
    }

    const res = await register({ email, password });
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error(error.message || "An error occurred");
    }
    toast.success("Registration success!");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <div className="mb-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="mb-5">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            placeholder="Password"
          />
          {showError && !confirmPassord && (
            <p className="text-red-500 font-semibold text-sm">
              This field is required.
            </p>
          )}
          {showError && password && password !== confirmPassord && (
            <p className="text-red-500 font-semibold text-sm">
              Password does not match.
            </p>
          )}
        </div>

        <button
          onClick={handleRegister}
          className="w-full cursor-pointer bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 hover:underline"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          Have account?{" "}
          <Link to="/" className="text-teal-600 cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
