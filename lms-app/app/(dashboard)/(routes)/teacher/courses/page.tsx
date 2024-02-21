import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-6">
      <DataTable columns={columns} data={course} />
    </div>
  );
};

export default CoursesPage;
