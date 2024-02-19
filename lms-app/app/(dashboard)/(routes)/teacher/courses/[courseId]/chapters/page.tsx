import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TitlePageForm from "./_components/chapter-title-form";
import DescriptionPageForm from "./_components/chapter-description-form";
import VideoPageForm from "./_components/chapter-video-form";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import {
  CircleDollarSignIcon,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

const ChaptersIdPage = async ({
  params,
}: {
  params: { chaptersId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapters = await db.chapter.findUnique({
    where: {
      id: params.chaptersId,
    },
    // include: {
    //   muxData: {
    //     orderBy: {
    //       createdAt: "asc",
    //     },
    //   },
    //   attachments: {
    //     orderBy: {
    //       createdAt: "desc",
    //     },
    //   },
    // },
  });
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!chapters) {
    return redirect("/");
  }

  const requiedFields = [
    chapters.title,
    chapters.description,
    chapters.videoUrl,
    chapters.position,
    chapters.isPublished,
    chapters.isFree,
  ];

  const totalFields = requiedFields.length;
  const completedFields = requiedFields.filter(Boolean).length;

  const totalCompletedFields = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className=" flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">chapters Setup</h1>
          <span className="text-sm text-slate-700">
            Completed Fields {totalCompletedFields}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapters</h2>
          </div>
          <TitlePageForm initialData={chapters} chaptersId={chapters.id} />
          <DescriptionPageForm
            initialData={chapters}
            chaptersId={chapters.id}
          />
          <VideoPageForm initialData={chapters} chaptersId={chapters.id} />
        </div>
      </div>
    </div>
  );
};

export default ChaptersIdPage;
