import { useState } from "react";

export default function App() {
  const [totalValue, setTotalValue] = useState(15837.5);
  const [totalItems, setTotalItems] = useState(150);

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        <p className="text-sm text-gray-500">Plumbing Business</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 text-center shadow">
          <h2 className="text-xl font-semibold">${totalValue.toFixed(2)}</h2>
          <p className="text-sm text-gray-500">Total Inventory Value</p>
        </div>
        <div className="border rounded-lg p-4 text-center shadow">
          <h2 className="text-xl font-semibold">{totalItems}</h2>
          <p className="text-sm text-gray-500">Total Items</p>
        </div>
      </div>

      <div className="flex justify-around mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">Shopping List</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow">Inventory</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow">Audit</button>
      </div>
    </div>
  );
}
