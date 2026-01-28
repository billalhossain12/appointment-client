/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { useGetServicesQuery } from "../../redux/features/services/servicesApi";
import { useGetStaffLoadsQuery } from "../../redux/features/staff/staffApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCreateAppointmentMutation } from "../../redux/features/appointment/appointmentApi";
import AppointmentsTable from "./AppointmensTable";

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

export default function AppointmentForm() {
  const [customerName, setCustomerName] = useState("");
  const [service, setService] = useState("");
  const [staff, setStaff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errorTxt, setErrorTxt] = useState("");

  const { data: staffLoads } = useGetStaffLoadsQuery(undefined);
  const { data: services } = useGetServicesQuery(undefined);

  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !customerName) {
      return toast.error("Please fill in all fields.");
    }
    // Combine date and time into ISO format
    const startTime = new Date(`${date}T${time}`).toISOString();

    const appointmendData = {
      customerName,
      service,
      staff: staff ? staff : null,
      startTime,
    };
    const res = await createAppointment(appointmendData);
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        setErrorTxt(error?.data?.message);
        return toast.error(error.data.message);
      }
      setErrorTxt(error.message || "An error occurred");
      return toast.error(error.message || "An error occurred");
    }
    toast.success("Appointment is created successfully!");
  };

  return (
    <main>
      <section>
        <div className="bg-white border rounded-xl p-6 max-w-xl">
          <h2 className="font-semibold mb-4">New Appointment</h2>

          <input
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-lg"
            placeholder="Customer Name"
          />

          <select
            onChange={(e) => setService(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-lg"
          >
            <option value="">Select Service</option>
            {services?.data?.map((service: Service) => {
              return (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => setStaff(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded-lg"
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

          <div className="flex gap-3">
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
            <input
              onChange={(e) => setTime(e.target.value)}
              type="time"
              className="flex-1 px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <p className="text-red-500 text-sm mb-4 mt-1 font-semibold">
              {errorTxt}
            </p>
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg  py-2 text-sm font-semibold text-white  flex items-center justify-center ${isLoading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-teal-700 bg-teal-600 cursor-pointer"}`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Icon icon="line-md:loading-loop" width="24" height="24" />
            ) : (
              "Create Appointment"
            )}
          </button>
        </div>
      </section>

      <section className="mt-10">
        <AppointmentsTable />
      </section>
    </main>
  );
}
