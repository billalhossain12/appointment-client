export default function AppointmentForm() {
  return (
    <div className="bg-white border rounded-xl p-6 max-w-xl">
      <h2 className="font-semibold mb-4">New Appointment</h2>

      <input
        className="w-full mb-3 px-3 py-2 border rounded-lg"
        placeholder="Customer Name"
      />

      <select className="w-full mb-3 px-3 py-2 border rounded-lg">
        <option>Select Service</option>
      </select>

      <select className="w-full mb-3 px-3 py-2 border rounded-lg">
        <option>Riya (3 / 5)</option>
        <option disabled>Farhan (5 / 5) — Full</option>
      </select>

      <div className="flex gap-3 mb-4">
        <input type="date" className="flex-1 px-3 py-2 border rounded-lg" />
        <input type="time" className="flex-1 px-3 py-2 border rounded-lg" />
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
        Create Appointment
      </button>
    </div>
  );
}
