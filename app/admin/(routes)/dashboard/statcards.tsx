import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { styles } from "@/app/styles";

interface StatCardProps {
  data: {
    title: string;
    value: string | number;
    icon: React.ElementType;
  }[];
}

const StatCard = ({ data }: StatCardProps) => {
  return (
    <>
      {data?.map((card) => (
        <Card key={card.title} className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className={`text-sm font-semibold ${styles.accentColor}`}>
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${styles.secondaryColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl bg-blue-50 ${styles.primaryColor}`}>
              <card.icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default StatCard;
