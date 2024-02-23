import { auth } from "@clerk/nextjs";
import Categories from "./_components/categories";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SearchInput from "@/components/search-input";
import CourseList from "@/components/course-list";
import getCourses from "@/actions/get-course";
interface SeacrhPageProps {
  searchParams: { title: string; categoryId: string };
}

const SearchPage = async ({ searchParams }: SeacrhPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 mb-5 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={category} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
