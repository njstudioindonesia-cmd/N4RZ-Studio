import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const items = await prisma.clientLogo.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const item = await prisma.clientLogo.create({ data: body });
    revalidatePath("/", "layout"); // Revalidate the whole site since logos appear on multiple pages
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
