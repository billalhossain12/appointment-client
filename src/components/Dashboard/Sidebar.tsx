import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Smart Queue</h1>

      <nav className="space-y-5 text-md text-gray-700">
        <div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-bold cursor-pointer hover:text-orange-500 ${
                isActive ? "text-orange-500" : "text-gray-700"
              }`
            }
            end
          >
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            to="appointments"
            className={({ isActive }) =>
              `font-bold cursor-pointer hover:text-orange-500 ${
                isActive ? "text-orange-500" : "text-gray-700"
              }`
            }
          >
            Appointments
          </NavLink>
        </div>
        <div>
          <NavLink
            to="queues"
            className={({ isActive }) =>
              `font-bold cursor-pointer hover:text-orange-500 ${
                isActive ? "text-orange-500" : "text-gray-700"
              }`
            }
          >
            Queue
          </NavLink>
        </div>
        <div>
          <NavLink
            to="staff"
            className={({ isActive }) =>
              `font-bold cursor-pointer hover:text-orange-500 ${
                isActive ? "text-orange-500" : "text-gray-700"
              }`
            }
          >
            Staff
          </NavLink>
        </div>
        <div>
          <NavLink
            to="services"
            className={({ isActive }) =>
              `font-bold cursor-pointer hover:text-orange-500 ${
                isActive ? "text-orange-500" : "text-gray-700"
              }`
            }
          >
            Services
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}
