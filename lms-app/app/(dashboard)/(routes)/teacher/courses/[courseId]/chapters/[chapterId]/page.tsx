import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TitleForm from "./_components/chapter-title-form";
import DescriptionPageForm from "./_components/chapter-description-form";
import VideoForm from "./_components/chapter-video-form";
import AccessForm from "./_components/chapter-access-form";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Banner } from "@/components/banner";
import ChapterAction from "./_components/chapter-action";

const ChaptersIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapters = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapters) {
    return redirect("/");
  }

  const requiedFields = [
    chapters.title,
    chapters.description,
    chapters.videoUrl,
  ];

  const totalFields = requiedFields.length;
  const completedFields = requiedFields.filter(Boolean).length;

  const totalCompletedFields = `(${completedFields}/${totalFields})`;
  const isComplteted = requiedFields.every(Boolean);

  return (
    <>
      {!chapters.isPublished && (
        <Banner
          variant="warning"
          label="This Chapter is Unpublish. It will not be visible in the Course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className=" w-full">
            <Link
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
              href={`/teacher/courses/${params.courseId}`}
            >
              <ArrowLeft className="h-5 w-5 mr-3" />
              Back to Course modification
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className=" flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Chapters Setup</h1>
            <span className="text-sm text-slate-700">
              Completed Fields {totalCompletedFields}
            </span>
          </div>
          <ChapterAction
            disabled={!isComplteted}
            chapterId={params.chapterId}
            courseId={params.courseId}
            isPublished={chapters.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your Chapters</h2>
            </div>
            <TitleForm
              initialData={chapters}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <DescriptionPageForm
              initialData={chapters}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
            <div>
              <div className="flex items-center gap-x-2 mt-6">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Chapter Access</h2>
              </div>
              <AccessForm
                initialData={chapters}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Chapter Video</h2>
            </div>
            <VideoForm
              initialData={chapters}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChaptersIdPage;
