"use client";

import { useState, useEffect } from "react";
import { SiteSettings } from "@prisma/client";
import { Save } from "lucide-react";

export default function SettingsEditor() {
  const [data, setData] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
          <p className="text-gray-500">Manage your studio's basic information and SEO.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Studio Name</label>
            <input 
              type="text" 
              value={data.studioName || ""}
              onChange={e => setData({...data, studioName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <div className="flex gap-4">
              <input 
                type="color" 
                value={data.accentColor || "#D97725"}
                onChange={e => setData({...data, accentColor: e.target.value})}
                className="w-12 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer" 
              />
              <input 
                type="text" 
                value={data.accentColor || ""}
                onChange={e => setData({...data, accentColor: e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
          <input 
            type="text" 
            value={data.metaTitle || ""}
            onChange={e => setData({...data, metaTitle: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
          <textarea 
            rows={3}
            value={data.metaDesc || ""}
            onChange={e => setData({...data, metaDesc: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
          />
        </div>

        <h3 className="text-lg font-semibold pt-4 border-t border-gray-100">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={data.email || ""}
              onChange={e => setData({...data, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="text" 
              value={data.phone || ""}
              onChange={e => setData({...data, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              type="text" 
              value={data.address || ""}
              onChange={e => setData({...data, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold pt-4 border-t border-gray-100">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input 
              type="url" 
              value={data.instagram || ""}
              onChange={e => setData({...data, instagram: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
            <input 
              type="url" 
              value={data.twitter || ""}
              onChange={e => setData({...data, twitter: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input 
              type="url" 
              value={data.linkedin || ""}
              onChange={e => setData({...data, linkedin: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
