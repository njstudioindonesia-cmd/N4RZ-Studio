import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let hero = await prisma.hero.findUnique({
      where: { id: "global" },
    });

    if (!hero) {
      hero = await prisma.hero.create({
        data: {
          id: "global",
          headline: "We design the future.",
          subHeadline: "Crafting premium digital experiences through thoughtful design and engineering.",
          ctaText: "View Our Work",
          ctaLink: "/#portfolio",
        },
      });
    }

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const hero = await prisma.hero.update({
      where: { id: "global" },
      data: body,
    });

    revalidatePath("/");

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero content" }, { status: 500 });
  }
}
