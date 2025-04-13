import { useState } from "react";

export default function App() {
  const [totalValue, setTotalValue] = useState(15837.5);
  const [totalItems, setTotalItems] = useState(150);

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: '3/4" PVC Elbow',
      description: "Standard 90-degree elbow fitting",
      quantity: 12,
      price: 1.25,
    },
    {
      id: 2,
      name: "Pipe Wrench",
      description: "Heavy-duty adjustable wrench",
      quantity: 4,
      price: 18.99,
    }
  ]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };
    setInventory([...inventory, newItem]);
    setForm({ name: "", description: "", quantity: 0, price: 0 });
    setTotalItems(totalItems + 1);
    setTotalValue(totalValue + newItem.quantity * newItem.price);
  };

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

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add Inventory Item</h3>
        <div className="grid grid-cols-1 gap-2">
          <input className="border p-2 rounded" placeholder="Item name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Price per unit" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddItem}>Add Item</button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Inventory List</h3>
        <ul className="space-y-2">
          {inventory.map(item => (
            <li key={item.id} className="border p-3 rounded shadow">
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
              <div className="text-sm">Quantity: {item.quantity}</div>
              <div className="text-sm">Price: ${item.price.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
