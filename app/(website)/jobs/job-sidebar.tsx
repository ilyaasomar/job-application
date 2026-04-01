"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
const JobSidebar = () => {
  const [isJuniorActive, setIsJuniorActive] = React.useState(false);
  const [isMidActive, setIsMidActive] = React.useState(false);
  const [isSeniorActive, setIsSeniorActive] = React.useState(false);

  const handleChange = (field: string, value: boolean) => {
    if (field === "junior") {
      // remove others and set junior to active
      setIsMidActive(false);
      setIsSeniorActive(false);
      setIsJuniorActive(value);
    } else if (field === "mid") {
      // remove others and set mid to active
      setIsJuniorActive(false);
      setIsSeniorActive(false);
      setIsMidActive(value);
    } else if (field === "senior") {
      // remove others and set senior to active
      setIsJuniorActive(false);
      setIsMidActive(false);
      setIsSeniorActive(value);
    }
  };
  return (
    <div className="bg-gray-50 w-1/4 h-full p-4 mt-3 rounded-md ">
      <div className="mb-4 flex flex-col items-start gap-y-2">
        <h2 className="font-semibold text-black">Refine Search</h2>
        <Input placeholder="Search for jobs..." className="mb-4" />
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
                <div key={category.id} className="space-x-2 flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    name={`category-${category.id}`}
                    className="w-5 h-5 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
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
            onClick={() => handleChange("junior", true)}
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
            onClick={() => handleChange("mid", true)}
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
            onClick={() => handleChange("senior", true)}
          >
            Senior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
