import { useState } from "react";

export function ServiceForm() {
  const [form, setForm] = useState({
    name: "",
    duration: 30,
    requiredStaffType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "duration" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create Service Payload:", form);
    // call POST /api/services
  };

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Create Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Consultation / Check-up"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Duration
          </label>
          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value={15}>15 Minutes</option>
            <option value={30}>30 Minutes</option>
            <option value={60}>60 Minutes</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Required Staff Type
          </label>
          <input
            type="text"
            name="requiredStaffType"
            value={form.requiredStaffType}
            onChange={handleChange}
            placeholder="Doctor / Consultant"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Save Service
        </button>
      </form>
    </div>
  );
}
