import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className=" p-4 border-b h-full flex items-center bg-white shadow-sw">
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
