import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSignIcon,
  File,
  FileBox,
  FileEdit,
  FileUp,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/categories-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
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
    course.chapters.some((chapter) => chapter.isPublished),
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
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((categories) => ({
              label: categories.name,
              value: categories.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course Chapters</h2>
            </div>
            <ChapterForm initialData={course} courseId={course.id} />
          </div>
          <div className="flex items-center gap-x-2 ">
            <IconBadge icon={CircleDollarSignIcon} />
            <h2 className="text-xl">Sell Your Course</h2>
          </div>
          <PriceForm initialData={course} courseId={course.id} />
          <div className="flex items-center gap-x-2 ">
            <IconBadge icon={File} />
            <h2 className="text-xl">Attach Files</h2>
          </div>
          <AttachmentForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
