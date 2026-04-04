"use client";
import { styles } from "@/app/styles";
import { DataTable } from "@/components/admin/reusables/data-table";
import Header from "@/components/admin/reusables/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";
import CategoryActions from "./category-actions";

interface CategoryProps {
  serialNo: number;
  id: string;
  category_name: string;
  slug: string;
}
const ShowCategoryData = ({ categories }: { categories: CategoryProps[] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Categories" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Category
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <CategoryActions isOpen={isOpen} setIsOpen={setIsOpen} />
        <DataTable columns={columns} data={categories} />
      </div>
    </div>
  );
};

export default ShowCategoryData;
