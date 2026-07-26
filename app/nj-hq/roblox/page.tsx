"use client";

import { useState, useEffect } from "react";
import { RobloxAsset } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import MultiImageUploader from "@/components/admin/MultiImageUploader";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function RobloxAssetsEditor() {
  const [items, setItems] = useState<RobloxAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    downloadLink: "",
    content: "",
    gallery: [] as string[],
    order: 0,
  });

  const fetchItems = () => {
    fetch("/api/roblox-assets")
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
      await fetch("/api/roblox-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      setNewItem({ title: "", description: "", price: "", imageUrl: "", category: "", downloadLink: "", content: "", gallery: [], order: items.length + 1 });
      fetchItems();
    } catch (error) {
      alert("Failed to add asset");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    try {
      await fetch(`/api/roblox-assets/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-bold text-gray-900">Roblox Marketplace</h1>
          <p className="text-gray-500">Manage digital assets for sale on Jasa Roblox Development.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Asset</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" required
                value={newItem.title}
                onChange={e => setNewItem({...newItem, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input 
                type="text" required placeholder="e.g. 500 Robux or Rp 50.000"
                value={newItem.price}
                onChange={e => setNewItem({...newItem, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (e.g. Map, Script)</label>
              <input 
                type="text" 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buy / Download Link (Optional)</label>
              <input 
                type="text" placeholder="https://..."
                value={newItem.downloadLink}
                onChange={e => setNewItem({...newItem, downloadLink: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUploader 
                label="Asset Cover Image (Required)"
                value={newItem.imageUrl}
                onChange={(url) => setNewItem({...newItem, imageUrl: url})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea 
                rows={4}
                value={newItem.description || ""}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>

          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description (Rich Text)</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <RichTextEditor 
                value={newItem.content || ""}
                onChange={(content) => setNewItem({...newItem, content})}
              />
            </div>
          </div>

          <div className="md:col-span-4 border-t border-gray-100 pt-6">
            <MultiImageUploader 
              label="Asset Gallery (Screenshots / Preview)"
              value={newItem.gallery}
              onChange={(urls) => setNewItem({...newItem, gallery: urls})}
            />
          </div>
          <button 
            type="submit" disabled={adding}
            className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 mt-4"
          >
            <Plus className="w-4 h-4" />
            {adding ? "Adding..." : "Add Asset"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded object-cover" src={item.imageUrl} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{item.price}</td>
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
