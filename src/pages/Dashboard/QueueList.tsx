export default function QueueList() {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Waiting Queue</h3>

      <ul className="space-y-3 text-sm">
        <li className="flex justify-between items-center">
          <span>1st — John Doe — 10:00 AM</span>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm">
            Assign
          </button>
        </li>

        <li>2nd — Alex — 10:30 AM</li>
      </ul>
    </div>
  );
}
