import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          studioName: "NJ Studio",
          accentColor: "#D97725",
          metaTitle: "NJ Studio | Premium Design & Creative Agency",
          metaDesc: "A premium design studio specializing in crafting unique digital experiences, branding, and motion design.",
          address: "Jakarta, Indonesia",
          email: "hello@nj.studio",
          phone: "+62 812 3456 7890",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const settings = await prisma.siteSettings.update({
      where: { id: "global" },
      data: body,
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
