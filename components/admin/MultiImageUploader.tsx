"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface MultiImageUploaderProps {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function MultiImageUploader({ label = "Gallery Images", value = [], onChange }: MultiImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    setError("");

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError("One or more files exceed the 5MB limit.");
        continue;
      }

      try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to upload image");
        const data = await res.json();
        
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err: any) {
        console.error("Upload error:", err);
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([...value, ...uploadedUrls]);
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
            <Image 
              src={url} 
              alt={`Gallery image ${index + 1}`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors"
        >
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-deep-amber" />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Upload className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium">Add Images</span>
            </div>
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
}
