"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { AboutUs } from "@prisma/client";

export default function AboutEditor() {
  const [data, setData] = useState<Partial<AboutUs>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("About Us section saved successfully!");
    } catch (error) {
      alert("Failed to save About Us section");
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = (url: string) => {
    setData({ ...data, imageUrls: [...(data.imageUrls || []), url] });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...(data.imageUrls || [])];
    newImages.splice(index, 1);
    setData({ ...data, imageUrls: newImages });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-500">Edit your agency's story, mission, and culture.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-charcoal text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            value={data.title || ""}
            onChange={e => setData({...data, title: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none text-xl font-display" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <textarea 
            rows={2}
            value={data.subtitle || ""}
            onChange={e => setData({...data, subtitle: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none font-medium" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content / Story</label>
          <textarea 
            rows={6}
            value={data.content || ""}
            onChange={e => setData({...data, content: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none leading-relaxed" 
          />
        </div>
        
        <div className="pt-6 border-t border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-4">Office / Culture Images</label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {(data.imageUrls || []).map((url, i) => (
              <div key={i} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                <img src={url} alt={`Image ${i}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleRemoveImage(i)}
                  className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <ImageUploader 
            label="Upload New Image"
            value=""
            onChange={(url) => { if(url) handleAddImage(url) }}
          />
        </div>
      </div>
    </div>
  );
}
