import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const POST = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId: userId as string },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });
    return NextResponse.json(attachment);
  } catch (err) {
    console.log("COURSES_ID_ATTACHMENT", err);
    return new NextResponse("Inernal Error", { status: 500 });
  }
};
