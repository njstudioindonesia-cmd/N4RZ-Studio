"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";

export default function TestimonialsEditor() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    client: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    order: 0,
  });

  const fetchItems = () => {
    fetch("/api/testimonials")
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
    setAdding(true);
    try {
      await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      setNewItem({ client: "", role: "", company: "", content: "", rating: 5, order: items.length + 1 });
      fetchItems();
    } catch (error) {
      alert("Failed to add testimonial");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500">Manage client reviews and social proof.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Testimonial</h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input 
                type="number" min="1" max="5" required
                value={newItem.rating}
                onChange={e => setNewItem({...newItem, rating: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
              <input 
                type="text" required
                value={newItem.client}
                onChange={e => setNewItem({...newItem, client: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role (e.g. CEO)</label>
              <input 
                type="text" 
                value={newItem.role}
                onChange={e => setNewItem({...newItem, role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input 
                type="text" 
                value={newItem.company}
                onChange={e => setNewItem({...newItem, company: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
            <textarea 
              required rows={3}
              value={newItem.content}
              onChange={e => setNewItem({...newItem, content: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <button 
            type="submit" disabled={adding}
            className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {adding ? "Adding..." : "Add Testimonial"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.client}
                  <span className="block text-xs text-gray-500 font-normal">{item.role} @ {item.company}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
