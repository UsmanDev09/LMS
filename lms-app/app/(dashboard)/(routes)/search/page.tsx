import { auth } from "@clerk/nextjs";
import Categories from "./_components/categories";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SearchInput from "@/components/search-input";

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

  return (
    <>
      <div className="px-6 pt-6 mb-5 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div>
        <Categories items={category} />
      </div>
    </>
  );
};

export default SearchPage;
