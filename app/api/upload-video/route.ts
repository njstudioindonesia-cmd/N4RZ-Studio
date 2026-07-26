import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("video") as File;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
       return NextResponse.json({ error: "Cloudinary belum dikonfigurasi di Environment Variables (.env)" }, { status: 500 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "nj_studio_videos" },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      url: (result as any).secure_url,
      success: true 
    });

  } catch (error: any) {
    console.error("Video upload error:", error);
    return NextResponse.json({ error: error.message || "Terjadi kesalahan saat mengunggah video ke Cloudinary" }, { status: 500 });
  }
}
