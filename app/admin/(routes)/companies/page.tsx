import React from "react";
import ShowCompaniesData from "./components/show-data";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

const CompanyPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const companies = await prisma.company.findMany({
    where: {
      userId: userId,
    },
  });

  const formattedCompanies = companies.map((company, index) => ({
    serialNo: index + 1,
    id: company.id,
    company_name: company.name,
    logoUrl: company.logoUrl,
    description: company.description,
    industry: company.industry,
    location: company.location,
  }));
  return (
    <div className="p-4">
      <ShowCompaniesData companies={formattedCompanies} />
    </div>
  );
};

export default CompanyPage;
