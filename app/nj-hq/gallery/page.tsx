"use client";

import { useState, useEffect } from "react";
import { GalleryItem } from "@prisma/client";
import { Plus } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function GalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    imageUrl: "",
    category: "",
    order: 0,
  });

  const fetchItems = () => {
    fetch("/api/gallery")
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
      await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      setNewItem({ imageUrl: "", category: "", order: items.length + 1 });
      fetchItems();
    } catch (error) {
      alert("Failed to add gallery item");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500">Manage visual explorations and photos.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Image</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input 
                type="number" 
                required
                value={newItem.order}
                onChange={e => setNewItem({...newItem, order: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text" 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                placeholder="e.g. Motion"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-4">
              <ImageUploader 
                label="Gallery Image" 
                value={newItem.imageUrl}
                onChange={(url) => setNewItem({...newItem, imageUrl: url})}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={adding}
            className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {adding ? "Adding..." : "Add Image"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={item.imageUrl} alt={item.category || "Gallery Image"} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
