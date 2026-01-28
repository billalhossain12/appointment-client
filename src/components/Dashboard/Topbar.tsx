import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

export function Topbar() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    dispatch(setUser({ user: null, token: null }));
  };
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <h2 className="font-semibold">Dashboard</h2>
      <button
        onClick={handleLogout}
        className="border px-4 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
