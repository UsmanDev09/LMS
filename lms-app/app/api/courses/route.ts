import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
    console.log("[COURSES]", err);
    return new NextResponse("Inernal Error", { status: 500 });
  }
};
