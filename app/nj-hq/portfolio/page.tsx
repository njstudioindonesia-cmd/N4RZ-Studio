"use client";

import { useState, useEffect } from "react";
import { PortfolioItem } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import MultiImageUploader from "@/components/admin/MultiImageUploader";
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

export default function PortfolioEditor() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  const [newItem, setNewItem] = useState({
    title: "",
    slug: "",
    category: "",
    year: "",
    client: "",
    coverImage: "",
    description: "",
    content: "",
    gallery: [] as string[],
    status: "COMPLETED",
    order: 0,
  });

  const fetchItems = () => {
    fetch("/api/portfolio")
      .then(res => res.json())
      .then(d => {
        setItems(d);
        setNewItem(prev => ({ ...prev, order: d.length + 1 }));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setNewItem({ ...newItem, title, slug });
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.coverImage) return alert("Cover image is required");
    
    setAdding(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed");

      setNewItem({ 
        title: "", slug: "", category: "", year: "", client: "", 
        coverImage: "", description: "", content: "", gallery: [], 
        status: "COMPLETED", order: items.length + 1 
      });
      fetchItems();
    } catch (error) {
      alert("Failed to add portfolio item. Make sure slug is unique.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
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
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-500">Manage your case studies and projects.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-6">Add New Project</h2>
        <form onSubmit={handleAdd} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input 
                type="number" required
                value={newItem.order}
                onChange={e => setNewItem({...newItem, order: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input 
                type="text" required
                value={newItem.title}
                onChange={handleTitleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
              <input 
                type="text" required
                value={newItem.slug}
                onChange={e => setNewItem({...newItem, slug: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none bg-gray-50" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input 
                type="text" required
                value={newItem.year}
                onChange={e => setNewItem({...newItem, year: e.target.value})}
                placeholder="2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input 
                type="text" required
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                placeholder="e.g. Brand Identity"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Client (Optional)</label>
              <input 
                type="text" 
                value={newItem.client}
                onChange={e => setNewItem({...newItem, client: e.target.value})}
                placeholder="Client Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={newItem.status}
                onChange={e => setNewItem({...newItem, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none bg-white"
              >
                <option value="COMPLETED">Completed</option>
                <option value="IN_PROGRESS">In Progress</option>
              </select>
            </div>

            <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ImageUploader 
                  label="Cover Image (Required)"
                  value={newItem.coverImage}
                  onChange={(url) => setNewItem({...newItem, coverImage: url})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Excerpt)</label>
                <textarea 
                  rows={4}
                  value={newItem.description}
                  onChange={e => setNewItem({...newItem, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none resize-none" 
                  placeholder="A brief summary of the project shown on the portfolio list."
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Case Study (Rich Text)</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <RichTextEditor 
                  value={newItem.content || ""}
                  onChange={(content) => setNewItem({...newItem, content})}
                />
              </div>
            </div>

            <div className="md:col-span-4 border-t border-gray-100 pt-6">
              <MultiImageUploader 
                label="Project Gallery (Multiple Images)"
                value={newItem.gallery}
                onChange={(urls) => setNewItem({...newItem, gallery: urls})}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={adding}
              className="flex items-center justify-center w-full gap-2 bg-charcoal text-white px-4 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {adding ? "Adding Project..." : "Publish Project"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gallery</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={item.coverImage} alt={item.title} className="w-16 h-12 object-cover rounded-md mr-4 border border-gray-200" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">/{item.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category} ({item.year})</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gallery.length} images</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No projects found. Add your first project above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
