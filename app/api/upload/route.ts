import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    
    if (!apiKey) {
      console.error("IMGBB_API_KEY is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Convert file to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    // Create form data for ImgBB
    const imgbbFormData = new URLSearchParams();
    imgbbFormData.append("key", apiKey);
    imgbbFormData.append("image", base64Image);

    // Upload to ImgBB
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imgbbFormData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ 
        url: data.data.url,
        success: true 
      });
    } else {
      console.error("ImgBB upload failed:", data);
      return NextResponse.json({ error: data.error?.message || "Failed to upload image" }, { status: 500 });
    }

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error during upload" }, { status: 500 });
  }
}
