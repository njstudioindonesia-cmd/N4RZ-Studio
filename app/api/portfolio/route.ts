import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const portfolio = await prisma.portfolioItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const item = await prisma.portfolioItem.create({
      data: body,
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
