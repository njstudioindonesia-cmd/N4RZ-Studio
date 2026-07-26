import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    let about = await prisma.aboutUs.findUnique({ where: { id: "global" } });
    if (!about) {
      about = await prisma.aboutUs.create({
        data: { id: "global" }
      });
    }
    return NextResponse.json(about);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await req.json();
    const about = await prisma.aboutUs.upsert({
      where: { id: "global" },
      update: body,
      create: { id: "global", ...body },
    });
    
    revalidatePath("/about");
    return NextResponse.json(about);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update about data" }, { status: 500 });
  }
}
