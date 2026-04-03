"use client";
import JobCardsList from "./card-lists";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { is } from "date-fns/locale";
import React from "react";
const categories = [
  {
    id: 1,
    name: "Engineering",
  },
  {
    id: 2,
    name: "Design",
  },
  {
    id: 3,
    name: "Marketing",
  },
  {
    id: 4,
    name: "Sales",
  },
  {
    id: 5,
    name: "Finance",
  },
  {
    id: 6,
    name: "Human Resources",
  },
  {
    id: 7,
    name: "Customer Service",
  },
];
const JobsPage = () => {
  const [searchedTerm, setSearchedTerm] = React.useState("");
  const [isJuniorActive, setIsJuniorActive] = React.useState(false);
  const [isMidActive, setIsMidActive] = React.useState(false);
  const [isSeniorActive, setIsSeniorActive] = React.useState(false);

  const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
    [],
  );

  const filteredJobs = {
    searchedTerm: searchedTerm,
    category: selectedCategories.join(","),
    level: isJuniorActive
      ? "junior"
      : isMidActive
        ? "mid"
        : isSeniorActive
          ? "senior"
          : "",
  };

  const handleChange = (field: string, value: boolean) => {
    if (field === "junior") {
      // remove others and set junior to active
      setIsMidActive(false);
      setIsSeniorActive(false);
      setIsJuniorActive(value);
      filteredJobs.level = "junior";
    } else if (field === "mid") {
      // remove others and set mid to active
      setIsJuniorActive(false);
      filteredJobs.level = "mid";
      setIsSeniorActive(false);
      setIsMidActive(value);
    } else if (field === "senior") {
      // remove others and set senior to active
      setIsJuniorActive(false);
      filteredJobs.level = "senior";
      setIsMidActive(false);
      setIsSeniorActive(value);
    }
  };

  // user useffect to log the changes in the filters
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(
  //       `/api/jobs?search=${filteredJobs.searchedTerm}&category=${filteredJobs.category}&level=${filteredJobs.level}`,
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   getData();
  // }, [isJuniorActive, isMidActive, isSeniorActive, searchedTerm]);

  // get data from the API
  const { data, isFetching } = useQuery({
    queryKey: ["jobs", filteredJobs],
    queryFn: async () => {
      const response = await fetch(
        `/api/jobs?search=${filteredJobs.searchedTerm}&category=${filteredJobs.category}&level=${filteredJobs.level}`,
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <div className="w-full flex">
      {/* sidebar */}
      <div className="bg-gray-50 w-1/4 h-full p-4 mt-3 rounded-md ">
        {/* form that handles all these filters */}
        <div className="mb-4 flex flex-col items-start gap-y-2">
          <h2 className="font-semibold text-black">Refine Search</h2>
          <Input
            placeholder="Search for jobs..."
            className="mb-4"
            value={searchedTerm}
            onChange={(e) => setSearchedTerm(e.target.value)}
          />
        </div>

        {/* filter by category */}
        <div className="mb-4 flex flex-col items-start gap-y-2">
          <h3 className="font-medium text-gray-700">Filter by category</h3>
          {/*  */}
          <div className="mt-2">
            <FieldGroup className="mx-auto w-56">
              <Field
                orientation="horizontal"
                className="flex flex-col items-start"
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="space-x-2 flex items-center"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      className="w-5 h-5 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                      value={category.id}
                      onCheckedChange={() =>
                        setSelectedCategories((prev) => {
                          return prev.includes(category.id)
                            ? prev.filter((id) => id !== category.id)
                            : [...prev, category.id];
                        })
                      }
                    />
                    <FieldLabel htmlFor={`category-${category.id}`}>
                      {category.name}
                    </FieldLabel>
                  </div>
                ))}
              </Field>
            </FieldGroup>
          </div>
        </div>

        {/* filter by levels */}
        <div className="mb-4 flex flex-col items-start gap-y-2 mt-6">
          <h3 className="font-medium text-gray-700">Filter by level</h3>
          <div
            className={cn(
              `mt-2 grid grid-cols-1 lg:grid-cols-3 gap-3 cursor-pointer`,
            )}
          >
            <Button
              variant="outline"
              size="sm"
              className={cn(
                `rounded-md cursor-pointer`,
                isJuniorActive
                  ? "bg-blue-500 hover:bg-blue-500 text-white hover:text-white"
                  : "bg-white text-gray-700",
              )}
              onClick={() => handleChange("junior", !isJuniorActive)}
            >
              Junior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                `rounded-md cursor-pointer`,
                isMidActive
                  ? "bg-blue-500 hover:bg-blue-500 text-white hover:text-white"
                  : "bg-white text-gray-700",
              )}
              onClick={() => handleChange("mid", !isMidActive)}
            >
              Mid
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                `rounded-md cursor-pointer`,
                isSeniorActive
                  ? "bg-blue-500 hover:bg-blue-500 text-white hover:text-white"
                  : "bg-white text-gray-700",
              )}
              onClick={() => handleChange("senior", !isSeniorActive)}
            >
              Senior
            </Button>
          </div>
        </div>
      </div>

      {/* middle content */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
        <p>Show {data && data.length} available jobs</p>
        <JobCardsList jobs={data ?? []} loading={isFetching || !data} />
      </div>
    </div>
  );
};

export default JobsPage;
