import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await request.json();

    const updated = await prisma.serviceLanding.update({
      where: { slug: slug },
      data: {
        serviceName: data.serviceName,
        headline: data.headline,
        subheadline: data.subheadline,
        videoUrl: data.videoUrl,
        features: data.features,
        packages: data.packages,
        faqs: data.faqs,
      }
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating landing page:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data landing page" },
      { status: 500 }
    );
  }
}
