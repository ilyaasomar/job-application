"use client";
import React from "react";
import { styles } from "@/app/styles";
import { DataTable } from "@/components/admin/reusables/data-table";
import Header from "@/components/admin/reusables/header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./column";
import CompanyActions from "./company-action";

const ShowCompaniesData = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="p-3">
      <div className="flex justify-between border-b pb-2">
        <Header title="Companies" />
        <Button
          className={`${styles.primaryBgColor} text-white py-5 rounded-sm hover:${styles.primaryBgColor} cursor-pointer`}
          onClick={() => setIsOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          Add Company
        </Button>
      </div>
      {/* show data */}
      <div className="mt-6">
        <CompanyActions isOpen={isOpen} setIsOpen={setIsOpen} />
        <DataTable columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default ShowCompaniesData;
