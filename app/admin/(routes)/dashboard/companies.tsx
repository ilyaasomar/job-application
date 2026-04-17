import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";
import { styles } from "@/app/styles";
import Image from "next/image";

interface RegisteredCompanyProps {
  id: string;
  name: string;
  industry: string | null;
  logoUrl: string | null;
  jobs: number;
}

const RegisteredCompanies = ({
  companies,
}: {
  companies: RegisteredCompanyProps[];
}) => {
  return (
    <Card className="h-fit border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className={`text-lg ${styles.secondaryColor}`}>
          Your Companies
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        {companies?.map((company) => (
          <div
            key={company.id}
            className="flex items-start gap-3 p-4 border rounded-xl bg-white hover:border-[#0559D2] transition-colors cursor-pointer group"
          >
            <div
              className={`p-2 rounded-lg font-bold text-xs bg-gray-200 text-white`}
            >
              <Image
                src={company?.logoUrl as string}
                width={30}
                height={30}
                alt="logo"
                priority
              />
            </div>
            <div className="space-y-1">
              <p
                className={`text-sm font-bold leading-none ${styles.secondaryColor}`}
              >
                {company.name}
              </p>
              <p
                className={`text-xs flex items-center gap-1 ${styles.accentColor}`}
              >
                <Building2 className="h-3 w-3" /> {company.industry}
              </p>
              <p
                className={`text-xs font-bold underline ${styles.primaryColor}`}
              >
                {company.jobs} active jobs
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RegisteredCompanies;
