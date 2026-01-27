import { useActivitiesQuery } from "../../redux/features/activities/activitiesApi";
import { useSummaryQuery } from "../../redux/features/dashboard/dashboard";

export interface IDashboard {
  totalToday: number;
  completed: number;
  pending: number;
  waitingQueue: number;
  staffLoad: StaffLoad[];
}

export interface StaffLoad {
  name: string;
  load: string;
  status: string;
}

export interface IActivity {
  _id: string;
  message: string;
  isDeleted: boolean;
  createdAt: string;
  __v: number;
}

export default function Dashboard() {
  const { data: summary } = useSummaryQuery(undefined);
  const { data: activities } = useActivitiesQuery(undefined);

  const summaryData: IDashboard = summary?.data || {};
  console.log("Dashboard Summary==> ", summary, activities);
  return (
    <main className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Stat title="Total Today" value={summaryData?.totalToday} />
        <Stat title="Completed" value={summaryData?.completed} />
        <Stat title="Pending" value={summaryData?.pending} />
        <Stat title="Waiting Queue" value={summaryData?.waitingQueue} />
      </div>

      {/* Staff Load */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-semibold mb-4">Staff Load</h3>
        <table className="w-full text-sm">
          <tbody>
            {summaryData?.staffLoad?.map((item: StaffLoad) => {
              return (
                <tr className="border-t">
                  <td className="py-2">{item.name}</td>
                  <td>{item.load}</td>
                  <td
                    className={`font-medium ${item.status == "OK" ? "text-green-600" : "text-red-600"}`}
                  >
                    {item.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Activity Log */}
      <div className="bg-white border rounded-xl p-5">
        <h3 className="font-semibold mb-3">Activity Log</h3>
        <ul className="text-sm space-y-2 text-gray-700">
          {activities?.data?.map((item: IActivity) => {
            return <li>{item.message}</li>;
          })}
        </ul>
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
