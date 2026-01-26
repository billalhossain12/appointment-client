export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Smart Queue</h1>

      <nav className="space-y-3 text-sm text-gray-700">
        <p className="font-medium cursor-pointer">Dashboard</p>
        <p className="cursor-pointer">Appointments</p>
        <p className="cursor-pointer">Queue</p>
        <p className="cursor-pointer">Staff</p>
        <p className="cursor-pointer">Services</p>
      </nav>
    </aside>
  );
}

