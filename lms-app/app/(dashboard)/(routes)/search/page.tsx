import { auth } from "@clerk/nextjs";
import Categories from "./_components/categories";
import { Category } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const SearchPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // const course = await getCourses({
  //   userId,
  //   ...searchParams,
  // });

  return (
    <div>
      <Categories items={category} />
    </div>
  );
};

export default SearchPage;
