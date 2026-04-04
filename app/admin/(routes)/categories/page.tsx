import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import React from "react";
import ShowCategoryData from "./components/show-data";

const CategoryPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
    orderBy: { createdAt: "desc" },
  });
  const formattedCategories = categories.map((category, index) => ({
    serialNo: index + 1,
    id: category.id,
    category_name: category.name,
    slug: category.slug,
  }));
  return (
    <div className="py-4 px-1">
      <ShowCategoryData categories={formattedCategories} />
    </div>
  );
};

export default CategoryPage;
