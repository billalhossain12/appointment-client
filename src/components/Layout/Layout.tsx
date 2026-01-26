import { Sidebar } from "../Dashboard/Sidebar";
import { Topbar } from "../Dashboard/Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}
