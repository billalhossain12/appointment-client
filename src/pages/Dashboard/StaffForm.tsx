import { useState } from "react";
export function StaffForm() {
  const [form, setForm] = useState({
    name: "",
    serviceType: "",
    dailyCapacity: 5,
    status: "AVAILABLE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "dailyCapacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create Staff Payload:", form);
    // call POST /api/staff
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Create Staff Member
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Riya"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Service Type
          </label>
          <input
            type="text"
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            placeholder="Doctor / Consultant / Support"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Daily Capacity
          </label>
          <input
            type="number"
            name="dailyCapacity"
            value={form.dailyCapacity}
            min={1}
            max={5}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">Max appointments per day</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Availability Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="AVAILABLE">Available</option>
            <option value="ON_LEAVE">On Leave</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Save Staff
        </button>
      </form>
    </div>
  );
}
