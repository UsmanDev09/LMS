import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard, LayoutDashboardIcon } from "lucide-react";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiedFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiedFields.length;
  const completedFields = requiedFields.filter(Boolean).length;

  const totalCompletedFields = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className=" flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Completed Fields {totalCompletedFields}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your Course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
