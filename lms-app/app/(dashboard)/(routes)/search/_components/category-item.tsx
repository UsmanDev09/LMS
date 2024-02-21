
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  return (
    <div className={cn("py-2 px-10 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition")}>
      <button>
        {Icon && <Icon size={20} />}
        <div className="truncate">{label}</div>
      </button>
    </div>
  );
};

export default CategoryItem;
