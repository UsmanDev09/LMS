"use client";
import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcElectroDevices,
  FcSportsMode,
  FcSalesPerformance,
  FcWorkflow,
  FcMultipleCameras,
  FcMultipleDevices,
} from "react-icons/fc";
import { IconType } from "react-icons";
import CategoryItem from "./category-item";

interface CategoryProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Engineering": FcEngineering,
  "Computer Sceince": FcMultipleDevices,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Coaching": FcWorkflow,
};

const Categories = ({ items }: CategoryProps) => {
  return (
    <div className="flex items-center gap-x-24 overflow-x-auto pb-2 justify-center">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
