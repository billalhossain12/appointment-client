import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Smart Queue</h1>

      <nav className="space-y-3 text-sm text-gray-700">
        <div>
          <Link to="/dashboard" className="font-medium cursor-pointer">
            Dashboard
          </Link>
        </div>
        <div>
          <Link to="appointments" className="font-medium cursor-pointer">
            Appointments
          </Link>
        </div>
        <div>
          <Link to="queues" className="font-medium cursor-pointer">
            Queue
          </Link>
        </div>
        <div>
          <Link to="staff" className="font-medium cursor-pointer">
            Staff
          </Link>
        </div>
        <div>
          <Link to="services" className="font-medium cursor-pointer">
            Services
          </Link>
        </div>
      </nav>
    </aside>
  );
}
