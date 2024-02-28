"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isCoursePage = pathName?.startsWith("/courses");
  return (
    <>
      <div className="hidden md:block">
        <SearchInput />
      </div>

      <div className="flex gap-x-4 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="outline">
              Exit
              <LogOut className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="outline">
              Teacher Mode
              <LogIn className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
