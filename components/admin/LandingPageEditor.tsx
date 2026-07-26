"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, GripVertical, CheckCircle2 } from "lucide-react";
import { ServiceLanding } from "@prisma/client";

export default function LandingPageEditor({ initialData }: { initialData: ServiceLanding }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
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

      const data = await res.json();
      if (data.success) {
        setVideoUrl(data.url);
        showNotification("Video berhasil diunggah!");
      } else {
        alert(data.error || "Gagal mengunggah video");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengunggah video");
    } finally {
      setIsUploading(false);
    }
  };
  
  // Basic Fields
  const [serviceName, setServiceName] = useState(initialData.serviceName);
  const [headline, setHeadline] = useState(initialData.headline);
  const [subheadline, setSubheadline] = useState(initialData.subheadline);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || "");

  // Arrays (JSON)
  const [features, setFeatures] = useState<any[]>(initialData.features as any[] || []);
  const [packages, setPackages] = useState<any[]>(initialData.packages as any[] || []);
  const [faqs, setFaqs] = useState<any[]>(initialData.faqs as any[] || []);

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/landing-pages/${initialData.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceName,
          headline,
          subheadline,
          videoUrl,
          features,
          packages,
          faqs
        })
      });

      if (res.ok) {
        showNotification("Berhasil disimpan!");
        router.refresh();
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 md:p-10">
      
      {/* HEADER ACTION */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-border/50">
        <h2 className="text-xl font-semibold">Pengaturan Konten Utama</h2>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="flex items-center gap-2 bg-deep-amber text-charcoal px-6 py-2.5 rounded-md font-medium hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          {isSaving ? "Menyimpan..." : <><Save className="w-4 h-4" /> Simpan Perubahan</>}
        </button>
      </div>

      {notification && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-3 border border-green-200">
          <CheckCircle2 className="w-5 h-5" /> {notification}
        </div>
      )}

      {/* BASIC FIELDS */}
      <div className="space-y-6 mb-12">
        <div>
          <label className="block text-sm font-medium mb-2">Nama Layanan (Tag di atas headline)</label>
          <input 
            type="text" 
            value={serviceName} 
            onChange={(e) => setServiceName(e.target.value)} 
            className="w-full border border-border rounded-md px-4 py-2 bg-charcoal/5" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Headline Utama</label>
          <input 
            type="text" 
            value={headline} 
            onChange={(e) => setHeadline(e.target.value)} 
            className="w-full border border-border rounded-md px-4 py-2 text-lg font-semibold bg-charcoal/5" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Subheadline (Deskripsi Pendek)</label>
          <textarea 
            value={subheadline} 
            onChange={(e) => setSubheadline(e.target.value)} 
            className="w-full border border-border rounded-md px-4 py-3 h-24 bg-charcoal/5" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Video Background URL (Kosongkan jika tidak ingin ada video)</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)} 
              placeholder="https://.../video.mp4"
              className="flex-1 border border-border rounded-md px-4 py-2 bg-charcoal/5" 
            />
            <label className={`cursor-pointer bg-charcoal text-white px-4 py-2 rounded-md font-medium hover:bg-charcoal/90 transition-colors flex items-center justify-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <span>{isUploading ? "Uploading..." : "Upload File"}</span>
              <input 
                type="file" 
                accept="video/*" 
                className="hidden" 
                onChange={handleVideoUpload}
                disabled={isUploading}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Catatan: Video Anda diunggah langsung dan disimpan secara aman dan permanen ke dalam server Cloudinary.</p>
        </div>
      </div>

      {/* FEATURES ARRAY */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Keunggulan / Fitur</h3>
          <button 
            onClick={() => setFeatures([...features, { icon: "Check", title: "", desc: "" }])}
            className="flex items-center gap-1 text-sm bg-charcoal/5 px-3 py-1.5 rounded-md hover:bg-charcoal/10"
          >
            <Plus className="w-4 h-4" /> Tambah Fitur
          </button>
        </div>
        <div className="space-y-4">
          {features.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start p-4 border border-border rounded-lg bg-gray-50/50">
              <div className="pt-2 text-gray-400 cursor-grab"><GripVertical className="w-5 h-5" /></div>
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Nama Icon (contoh: Zap, Smartphone, Layout)" 
                  value={item.icon} 
                  onChange={(e) => {
                    const newArr = [...features];
                    newArr[idx].icon = e.target.value;
                    setFeatures(newArr);
                  }}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Judul Fitur" 
                  value={item.title} 
                  onChange={(e) => {
                    const newArr = [...features];
                    newArr[idx].title = e.target.value;
                    setFeatures(newArr);
                  }}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm font-medium" 
                />
                <textarea 
                  placeholder="Deskripsi" 
                  value={item.desc} 
                  onChange={(e) => {
                    const newArr = [...features];
                    newArr[idx].desc = e.target.value;
                    setFeatures(newArr);
                  }}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm md:col-span-2" 
                />
              </div>
              <button 
                onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                className="text-red-500 hover:bg-red-50 p-2 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGES ARRAY */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Paket Harga (Pricing)</h3>
          <button 
            onClick={() => setPackages([...packages, { title: "", desc: "", price: "", items: [], isPopular: false, link: "" }])}
            className="flex items-center gap-1 text-sm bg-charcoal/5 px-3 py-1.5 rounded-md hover:bg-charcoal/10"
          >
            <Plus className="w-4 h-4" /> Tambah Paket
          </button>
        </div>
        <div className="space-y-6">
          {packages.map((pkg, idx) => (
            <div key={idx} className={`p-5 border rounded-xl relative ${pkg.isPopular ? 'border-deep-amber bg-deep-amber/5' : 'border-border'}`}>
              <button 
                onClick={() => setPackages(packages.filter((_, i) => i !== idx))}
                className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-1 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                <input 
                  type="text" placeholder="Nama Paket (cth: Premium)" value={pkg.title} 
                  onChange={(e) => { const arr = [...packages]; arr[idx].title = e.target.value; setPackages(arr); }}
                  className="w-full border border-border rounded px-3 py-2 font-bold" 
                />
                <input 
                  type="text" placeholder="Harga (cth: Mulai Rp 5 Jt)" value={pkg.price} 
                  onChange={(e) => { const arr = [...packages]; arr[idx].price = e.target.value; setPackages(arr); }}
                  className="w-full border border-border rounded px-3 py-2 text-deep-amber font-semibold" 
                />
                <input 
                  type="text" placeholder="Deskripsi Singkat" value={pkg.desc} 
                  onChange={(e) => { const arr = [...packages]; arr[idx].desc = e.target.value; setPackages(arr); }}
                  className="w-full border border-border rounded px-3 py-2 text-sm md:col-span-2" 
                />
                <input 
                  type="text" placeholder="Link Tombol WhatsApp" value={pkg.link} 
                  onChange={(e) => { const arr = [...packages]; arr[idx].link = e.target.value; setPackages(arr); }}
                  className="w-full border border-border rounded px-3 py-2 text-sm md:col-span-2" 
                />
              </div>

              <div className="mb-4 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id={`popular-${idx}`}
                  checked={pkg.isPopular}
                  onChange={(e) => { const arr = [...packages]; arr[idx].isPopular = e.target.checked; setPackages(arr); }}
                  className="w-4 h-4 accent-deep-amber rounded"
                />
                <label htmlFor={`popular-${idx}`} className="text-sm font-medium">Tandai sebagai "Terpopuler" (Highlight)</label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Item Layanan (Pisahkan dengan koma)</label>
                <textarea 
                  value={(pkg.items || []).join(", ")} 
                  onChange={(e) => { 
                    const arr = [...packages]; 
                    arr[idx].items = e.target.value.split(",").map(i => i.trim()).filter(Boolean); 
                    setPackages(arr); 
                  }}
                  placeholder="Mobile Responsive, Desain Custom, 5 Halaman..."
                  className="w-full border border-border rounded px-3 py-2 text-sm h-20" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQS ARRAY */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Tanya Jawab (FAQ)</h3>
          <button 
            onClick={() => setFaqs([...faqs, { question: "", answer: "" }])}
            className="flex items-center gap-1 text-sm bg-charcoal/5 px-3 py-1.5 rounded-md hover:bg-charcoal/10"
          >
            <Plus className="w-4 h-4" /> Tambah FAQ
          </button>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="flex gap-4 items-start p-4 border border-border rounded-lg bg-gray-50/50">
              <div className="pt-2 text-gray-400 cursor-grab"><GripVertical className="w-5 h-5" /></div>
              <div className="flex-grow flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Pertanyaan" 
                  value={faq.question} 
                  onChange={(e) => {
                    const newArr = [...faqs];
                    newArr[idx].question = e.target.value;
                    setFaqs(newArr);
                  }}
                  className="w-full border border-border rounded px-3 py-1.5 font-medium" 
                />
                <textarea 
                  placeholder="Jawaban" 
                  value={faq.answer} 
                  onChange={(e) => {
                    const newArr = [...faqs];
                    newArr[idx].answer = e.target.value;
                    setFaqs(newArr);
                  }}
                  className="w-full border border-border rounded px-3 py-1.5 text-sm h-20" 
                />
              </div>
              <button 
                onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                className="text-red-500 hover:bg-red-50 p-2 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
