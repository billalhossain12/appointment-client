export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Email"
        />
        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          type="password"
          placeholder="Password"
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded-lg"
          type="password"
          placeholder="Confirm Password"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
          Register
        </button>
      </div>
    </div>
  );
}
