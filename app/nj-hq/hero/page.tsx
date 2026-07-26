"use client";

import { useState, useEffect } from "react";
import { Hero } from "@prisma/client";
import { Save } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

export default function HeroEditor() {
  const [data, setData] = useState<Partial<Hero>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (json.success) {
        setData({...data, videoUrl: json.url});
        alert("Video berhasil diunggah!");
      } else {
        alert(json.error || "Gagal mengunggah video");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengunggah video");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetch("/api/hero")
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Hero section saved successfully!");
    } catch (error) {
      alert("Failed to save hero section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-500">Edit the main headline and call to action.</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input 
            type="text" 
            value={data.headline || ""}
            onChange={e => setData({...data, headline: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none text-2xl font-display" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Headline</label>
          <textarea 
            rows={3}
            value={data.subHeadline || ""}
            onChange={e => setData({...data, subHeadline: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
          />
        </div>
        <div>
          <ImageUploader 
            label="Hero Image URL (Optional - Fallback if no video)"
            value={data.imageUrl || ""}
            onChange={(url) => setData({...data, imageUrl: url})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Background URL</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={data.videoUrl || ""} 
              onChange={(e) => setData({...data, videoUrl: e.target.value})} 
              placeholder="https://.../video.mp4"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
            <label className={`cursor-pointer bg-charcoal text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span>{isUploading ? "Uploading..." : "Upload Video"}</span>
              <input 
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleVideoUpload}
                disabled={isUploading}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Video akan otomatis menjadi latar belakang penuh di halaman utama.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
            <input 
              type="text" 
              value={data.ctaText || ""}
              onChange={e => setData({...data, ctaText: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
            <input 
              type="text" 
              value={data.ctaLink || ""}
              onChange={e => setData({...data, ctaLink: e.target.value})}
              placeholder="/#portfolio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-charcoal outline-none" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
