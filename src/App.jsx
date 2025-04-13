import { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("inventory");
  const [totalValue, setTotalValue] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [inventory, setInventory] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    const stored = localStorage.getItem("inventory");
    if (stored) {
      const parsed = JSON.parse(stored);
      setInventory(parsed);
      const totalQty = parsed.reduce((sum, item) => sum + item.quantity, 0);
      const totalVal = parsed.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalItems(totalQty);
      setTotalValue(totalVal);
    }
  }, []);

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
      photos: [],
      mainPhoto: null,
    };
    const updated = [...inventory, newItem];
    setInventory(updated);
    setForm({ name: "", description: "", quantity: 0, price: 0 });
    setShowForm(false);
    localStorage.setItem("inventory", JSON.stringify(updated));
    const totalQty = updated.reduce((sum, item) => sum + item.quantity, 0);
    const totalVal = updated.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalItems(totalQty);
    setTotalValue(totalVal);
  };

  const handleDeleteItem = (id) => {
    const updated = inventory.filter(item => item.id !== id);
    setInventory(updated);
    localStorage.setItem("inventory", JSON.stringify(updated));
    const totalQty = updated.reduce((sum, item) => sum + item.quantity, 0);
    const totalVal = updated.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalItems(totalQty);
    setTotalValue(totalVal);
    setSelectedItem(null);
  };

  return (
    <div className="p-4 space-y-4 relative min-h-screen pb-20">
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

      <div className="flex justify-around mt-6 border-b pb-2">
        <button className={`px-4 py-2 ${tab === "shopping" ? "font-bold border-b-2 border-blue-500" : ""}`} onClick={() => setTab("shopping")}>Shopping List</button>
        <button className={`px-4 py-2 ${tab === "inventory" ? "font-bold border-b-2 border-blue-500" : ""}`} onClick={() => setTab("inventory")}>Inventory</button>
        <button className={`px-4 py-2 ${tab === "audit" ? "font-bold border-b-2 border-blue-500" : ""}`} onClick={() => setTab("audit")}>Audit</button>
      </div>

      {tab === "shopping" && (
        <div className="text-center mt-10 text-gray-600">
          <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Shopping Cart" className="mx-auto opacity-30 w-24 h-24" />
          <p className="mt-4">No Items Below Minimum Quantity</p>
        </div>
      )}

      {tab === "inventory" && (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Inventory List</h3>
            <ul className="space-y-2">
              {inventory.map(item => (
                <li key={item.id} className="border p-3 rounded shadow cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                  <div className="text-sm">Quantity: {item.quantity}</div>
                  <div className="text-sm">Price Per Item: ${item.price.toFixed(2)}</div>
                  <div className="text-sm">Total Value: ${(item.price * item.quantity).toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl shadow-lg"
            onClick={() => setShowForm(true)}
          >
            +
          </button>

          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Add Inventory Item</h3>
                <div className="grid grid-cols-1 gap-2">
                  <input className="border p-2 rounded" placeholder="Item name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <input className="border p-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  <div className="flex items-center border p-2 rounded">
                    <span className="mr-2 text-sm text-gray-500">Qty.</span>
                    <input className="flex-1 outline-none" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                  </div>
                  <div className="flex items-center border p-2 rounded">
                    <span className="mr-2 text-sm text-gray-500">$</span>
                    <input className="flex-1 outline-none" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Cost/1" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddItem}>Add</button>
                </div>
              </div>
            </div>
          )}

          {selectedItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-11/12 max-w-md shadow-lg relative p-6">
                <button className="absolute top-4 right-4 text-sm bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{selectedItem.description}</p>
                <p className="text-sm">Quantity: {selectedItem.quantity}</p>
                <p className="text-sm">Price per Item: ${selectedItem.price.toFixed(2)}</p>
                <p className="text-sm mb-4">Total Value: ${(selectedItem.price * selectedItem.quantity).toFixed(2)}</p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {selectedItem.photos?.map((photo, i) => (
                    <div key={i} className="w-20 h-20 bg-gray-200 rounded overflow-hidden">
                      <img src={photo} alt="part" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-20 h-20 border border-gray-300 rounded flex items-center justify-center relative">
                    <div className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center text-gray-500 absolute bottom-1 right-1 text-xl">+</div>
                    <div className="text-gray-400 text-xs">🖼️</div>
                  </div>
                </div>
                <button className="w-full bg-red-500 text-white py-2 rounded" onClick={() => handleDeleteItem(selectedItem.id)}>Delete Item</button>
                <button className="absolute top-2 left-2 text-xl" onClick={() => setSelectedItem(null)}>×</button>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "audit" && (
        <div className="text-center mt-10 text-gray-600">
          <p>In development</p>
        </div>
      )}
    </div>
  );
}
