"use client";

import { useState, useEffect } from "react";
import { ClientLogo } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function ClientLogosEditor() {
  const [items, setItems] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    name: "",
    imageUrl: "",
    service: "ALL", // "ROBLOX", "WEB", or "ALL"
    order: 0,
  });

  const fetchItems = () => {
    fetch("/api/client-logos")
      .then(res => res.json())
      .then(d => {
        setItems(d);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.imageUrl) return alert("Image is required");
    setAdding(true);
    try {
      await fetch("/api/client-logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      setNewItem({ name: "", imageUrl: "", service: "ALL", order: items.length + 1 });
      fetchItems();
    } catch (error) {
      alert("Failed to add client logo");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this logo?")) return;
    try {
      await fetch(`/api/client-logos/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client Logos</h1>
          <p className="text-gray-500">Manage partner and client logos to display on landing pages.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Logo</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input 
                type="number" required
                value={newItem.order}
                onChange={e => setNewItem({...newItem, order: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input 
                type="text" required placeholder="e.g. Acme Corp"
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Category</label>
              <select 
                value={newItem.service}
                onChange={e => setNewItem({...newItem, service: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              >
                <option value="ALL">All Pages</option>
                <option value="ROBLOX">Roblox Only</option>
                <option value="WEB">Web Only</option>
              </select>
            </div>
          </div>
          <div>
            <ImageUploader 
              label="Client Logo (Transparent PNG recommended)"
              value={newItem.imageUrl}
              onChange={(url) => setNewItem({...newItem, imageUrl: url})}
            />
          </div>
          <button 
            type="submit" disabled={adding}
            className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 mt-4"
          >
            <Plus className="w-4 h-4" />
            {adding ? "Adding..." : "Add Logo"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo & Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded p-1 flex items-center justify-center">
                      <img className="max-h-full max-w-full object-contain" src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.service === 'ALL' ? 'bg-green-100 text-green-800' :
                    item.service === 'ROBLOX' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.service}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No logos added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
