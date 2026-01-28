/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useGetStaffLoadsQuery } from "../../redux/features/staff/staffApi";
import { useGetServicesQuery } from "../../redux/features/services/servicesApi";
import { useUpdateAppointmentMutation } from "../../redux/features/appointment/appointmentApi";
import moment from "moment";

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

const AppointmentEditModal = ({
  updatableAppointment,
}: {
  updatableAppointment: Appointment;
}) => {
  // Local States
  const [customerName, setCustomerName] = useState("");
  const [service, setService] = useState<string>("");
  const [staff, setStaff] = useState<string>("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const { data: staffLoads } = useGetStaffLoadsQuery(undefined);
  const { data: services } = useGetServicesQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorTxt, setErrorTxt] = useState("");

  const showModal = () => {
    setIsModalOpen(true);

    const time24Hour = moment(updatableAppointment?.startTime).format(
      "HH:mm:ss",
    );
    const datePart = moment(updatableAppointment?.startTime).format(
      "YYYY-MM-DD",
    );
    // Setting the dynamic values
    setCustomerName(updatableAppointment.customerName);
    setService(updatableAppointment.service._id);
    setStaff(updatableAppointment.staff._id);
    setStatus(updatableAppointment.status);
    setDate(datePart);
    setTime(time24Hour);
  };

  const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();

  const handleOk = async () => {
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
    const res = await updateAppointment(appointmendData);
    if (res.error) {
      const error = res.error as any;
      if (error?.data?.message) {
        setErrorTxt(error?.data?.message);
        return toast.error(error.data.message);
      }
      setErrorTxt(error.message || "An error occurred");
      return toast.error(error.message || "An error occurred");
    }
    toast.success("Staff created successfully!");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Icon
        className="cursor-pointer"
        onClick={showModal}
        icon="mdi:pencil"
        width="18"
      />
      <Modal
        title="Update Appointment"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        okText="Update"
      >
        <section>
          <div className="bg-white border rounded-xl p-6 max-w-xl">
            <input
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
              placeholder="Customer Name"
            />

            <select
              onChange={(e) => setService(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
              defaultValue={service}
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
              defaultValue={staff}
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

            {/* Appointment Status  */}
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded-lg"
              defaultValue={status}
            >
              <option value="">Select Status</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="NO_SHOW">No Show</option>
            </select>

            <div className="flex gap-3">
              <input
                onChange={(e) => {
                  console.log("Changed Date ==========> ", e.target.value);
                  setDate(e.target.value);
                }}
                value={date}
                type="date"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
              <input
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                value={time}
                type="time"
                className="flex-1 px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <p className="text-red-500 text-sm mb-4 mt-1 font-semibold">
                {errorTxt}
              </p>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default AppointmentEditModal;
