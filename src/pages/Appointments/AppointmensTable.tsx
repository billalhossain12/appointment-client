/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../redux/features/appointment/appointmentApi";
import AppointmentEditModal from "./AppointmentEditModal";
import { toast } from "react-toastify";

export interface Service {
  _id: string;
  name: string;
  duration: number;
  requiredStaffType: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Staff {
  _id: string;
  name: string;
  serviceType: string;
  dailyCapacity: number;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Appointment {
  _id: string;
  customerName: string;
  service: Service;
  staff: Staff;
  startTime: string;
  endTime?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  isQueued: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AppointmentsTable() {
  const [filter, setFilter] = useState<"all" | "assigned" | "not-queued">(
    "assigned",
  );
  const [deletingIndex, setDeletingIndex] = useState<number>();
  const { data, isLoading, refetch } = useGetAppointmentsQuery(undefined);
  const [deleteAppointment, { isLoading: isDeletingAppointment }] =
    useDeleteAppointmentMutation();

  const handleDeleteAppointment = async (id: string, index: number) => {
    const isConfirmed = window.confirm("Are you sure?");
    if (!isConfirmed) return;
    setDeletingIndex(index);
    const res = await deleteAppointment(id);
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        return toast.error(error.data.message);
      }
    }
    toast.success("Appointment is deleted successfully!");
  };

  // Filter appointments
  const filteredAppointments =
    data?.data?.filter((appointment: Appointment) => {
      if (filter === "assigned") {
        return appointment.staff !== null && appointment.staff !== undefined;
      }
      if (filter === "not-queued") {
        return !appointment.isQueued;
      }
      return true; // 'all'
    }) || [];

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "NO_SHOW":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Appointments</h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("assigned")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "assigned" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Icon icon="mdi:account-check" className="inline mr-2" />
            Assigned (
            {data?.data?.filter((a: Appointment) => a.staff).length || 0})
          </button>

          <button
            onClick={() => setFilter("not-queued")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "not-queued" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Icon icon="mdi:calendar-remove" className="inline mr-2" />
            Not Queued (
            {data?.data?.filter((a: Appointment) => !a.isQueued).length || 0})
          </button>

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === "all" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            <Icon icon="mdi:view-list" className="inline mr-2" />
            All ({data?.data?.length || 0})
          </button>

          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
          >
            <Icon icon="mdi:refresh" className="inline mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Icon
            icon="line-md:loading-loop"
            width="48"
            height="48"
            className="text-teal-600"
          />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <Icon
            icon="mdi:calendar-blank"
            width="64"
            height="64"
            className="mx-auto text-gray-300 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No appointments found
          </h3>
          <p className="text-gray-500">
            {filter === "assigned"
              ? "No assigned appointments found. Create a new appointment or assign staff to existing ones."
              : filter === "not-queued"
                ? "All appointments are currently in queue."
                : "No appointments created yet. Create your first appointment!"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Queue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map(
                (appointment: Appointment, index: number) => {
                  const { date, time } = formatDateTime(appointment.startTime);
                  const isAssigned =
                    appointment.staff !== null &&
                    appointment.staff !== undefined;
                  const staffName = isAssigned
                    ? typeof appointment.staff === "object"
                      ? appointment.staff.name
                      : "Assigned"
                    : "Not Assigned";

                  const serviceName =
                    typeof appointment.service === "object"
                      ? appointment.service.name
                      : "Service";

                  return (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <span className="text-teal-800 font-semibold">
                              {appointment.customerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {appointment._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {serviceName}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {isAssigned ? (
                            <>
                              <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                              <span className="text-sm text-gray-900">
                                {staffName}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="h-2 w-2 bg-yellow-400 rounded-full mr-2"></span>
                              <span className="text-sm text-gray-500 italic">
                                Pending Assignment
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.isQueued ? (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            <Icon
                              icon="mdi:clock-outline"
                              className="inline mr-1"
                            />
                            In Queue
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            Direct
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">
                          <Icon icon="mdi:eye" width="18" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <AppointmentEditModal
                            updatableAppointment={appointment}
                          />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteAppointment(appointment._id, index)
                          }
                          className="text-red-600 hover:text-red-900"
                          disabled={isDeletingAppointment}
                        >
                          {isDeletingAppointment && deletingIndex == index ? (
                            <Icon
                              icon="line-md:loading-loop"
                              width="18"
                              height="18"
                            />
                          ) : (
                            <Icon icon="mdi:delete" width="18" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total</div>
          <div className="text-2xl font-bold text-blue-700">
            {data?.data?.length || 0}
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Assigned</div>
          <div className="text-2xl font-bold text-green-700">
            {data?.data?.filter((a: Appointment) => a.staff).length || 0}
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">In Queue</div>
          <div className="text-2xl font-bold text-purple-700">
            {data?.data?.filter((a: Appointment) => a.isQueued).length || 0}
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">Pending</div>
          <div className="text-2xl font-bold text-orange-700">
            {data?.data?.filter((a: Appointment) => !a.staff).length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
