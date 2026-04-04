import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ShowJobData from "./components/show-data";

const JobsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const jobs = await prisma.job.findMany({
    where: {
      postedById: userId,
    },
    include: {
      company: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const company = await prisma.company.findMany({
    where: {
      userId: userId,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },
  });
  const formattedJobs = jobs.map((job, index) => ({
    serialNo: index + 1,
    id: job.id,
    job_title: job.title,
    company_id: job.company.id,
    company_name: job.company.name,
    category_id: job.category?.id,
    category_name: job.category?.name,
    slug: job.slug,
    description: job.description,
    type: job.type,
    experienceLevel: job.experienceLevel,
    status: job.status,
    location: job.location,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    companies_data: company,
    categories_data: categories,
  }));

  return (
    <div className="py-4 px-1">
      <ShowJobData
        jobs={formattedJobs}
        company_data={company}
        category_data={categories}
      />
    </div>
  );
};

export default JobsPage;
