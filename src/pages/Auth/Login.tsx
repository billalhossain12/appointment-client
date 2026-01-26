export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome back</h1>

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Email"
        />

        <input
          type="password"
          className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Password"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Login
        </button>

        <button className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 transition">
          Demo Login
        </button>

        <p className="text-sm mt-4 text-center text-gray-600">
          No account?{" "}
          <span className="text-blue-600 cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}
