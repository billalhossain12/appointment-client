export function Topbar() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h2 className="font-semibold">Dashboard</h2>
      <button className="border px-4 py-1.5 rounded-lg hover:bg-gray-100">
        Logout
      </button>
    </header>
  );
}
