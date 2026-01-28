/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useAssignFromQueuedsMutation,
  useGetQueuedsQuery,
} from "../../redux/features/queueds/queueds";
import moment from "moment";
import { useGetStaffLoadsQuery } from "../../redux/features/staff/staffApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

export interface Queue {
  _id: string;
  customerName: string;
  service: string;
  staff: any;
  startTime: string;
  status: string;
  isQueued: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  queuePosition: number;
  queueLabel: string;
}

export interface StaffLoad {
  staffId: string;
  name: string;
  serviceType: string;
  status: string;
  todayLoad: number;
  dailyCapacity: number;
  state: string;
  label: string;
}

export default function QueueList() {
  const [staff, setStaff] = useState("");
  const { data } = useGetQueuedsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: staffLoads } = useGetStaffLoadsQuery(undefined);
  const [assignFromQueueds, { isLoading }] = useAssignFromQueuedsMutation();

  const handleAssign = async () => {
    if (!staff) {
      return toast.error("Staff Id is required.");
    }
    const res = await assignFromQueueds(staff);
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
      return toast.error(error.message || "An error occurred");
    }
    toast.success("Assigned from queue is success!");
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Waiting Queue</h3>

      <ul className="space-y-8 text-sm">
        {data?.data?.map((queue: Queue) => {
          return (
            <li className="flex gap-3 justify-between items-center">
              <p>
                {queue.queueLabel} — {queue.customerName} —{" "}
                {moment(queue.startTime).format("LT")}
              </p>
              <div>
                <select
                  onChange={(e) => {
                    setStaff(e.target.value);
                  }}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Staff</option>
                  {staffLoads?.data?.map((load: StaffLoad) => {
                    return (
                      <option
                        key={load.staffId}
                        disabled={load.todayLoad >= load.dailyCapacity}
                        value={load.staffId}
                      >
                        {load.label}{" "}
                        {load.todayLoad >= load.dailyCapacity ? "— Full" : ""}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="submit"
                  className={`w-full rounded-lg  py-2 text-sm font-semibold text-white  flex items-center justify-center ${isLoading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-teal-700 bg-teal-600 cursor-pointer"}`}
                  disabled={isLoading}
                  onClick={handleAssign}
                >
                  {isLoading ? (
                    <Icon icon="line-md:loading-loop" width="24" height="24" />
                  ) : (
                    "Assign"
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
