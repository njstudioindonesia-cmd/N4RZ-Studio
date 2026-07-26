"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ label = "Image", value, onChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex flex-col gap-4">
        {value ? (
          <div className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <Image 
              src={value} 
              alt="Uploaded preview" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 bg-white/90 backdrop-blur text-gray-700 hover:text-charcoal rounded-md shadow-sm border border-gray-200 transition-colors"
                title="Change Image"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 bg-white/90 backdrop-blur text-red-600 hover:text-red-700 rounded-md shadow-sm border border-gray-200 transition-colors"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-md aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-deep-amber" />
                <span className="text-sm">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs text-gray-400">JPG, PNG, GIF up to 5MB</span>
              </div>
            )}
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {/* Fallback to manual URL entry */}
        <div className="flex flex-col gap-1 w-full max-w-md">
          <label className="text-xs text-gray-500">Or paste image URL directly:</label>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-charcoal focus:border-charcoal outline-none transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
    </div>
  );
}
