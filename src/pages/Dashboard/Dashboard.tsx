import { Sidebar } from "../../components/Dashboard/Sidebar";
import { Topbar } from "../../components/Dashboard/Topbar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Stat title="Total Today" value="12" />
            <Stat title="Completed" value="7" />
            <Stat title="Pending" value="5" />
            <Stat title="Waiting Queue" value="3" />
          </div>

          {/* Staff Load */}
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-4">Staff Load</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-t">
                  <td className="py-2">Riya</td>
                  <td>4 / 5</td>
                  <td className="text-green-600 font-medium">OK</td>
                </tr>
                <tr className="border-t">
                  <td className="py-2">Farhan</td>
                  <td>5 / 5</td>
                  <td className="text-red-600 font-medium">Booked</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Activity Log */}
          <div className="bg-white border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Activity Log</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>11:45 AM — Appointment for John auto-assigned to Riya</li>
              <li>12:10 PM — Appointment moved from queue to Farhan</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
