import { auth } from "@clerk/nextjs";
import Categories from "./_components/categories";

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

  return (
    <div>
      <Categories items={category} />
    </div>
  );
};

export default SearchPage;
