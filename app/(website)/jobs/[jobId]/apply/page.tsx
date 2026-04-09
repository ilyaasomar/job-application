"use client";
import { useParams } from "next/navigation";
import React from "react";

const ApplyPage = () => {
  const params = useParams();
  const jobId = params.jobId;
  console.log(jobId);
  return (
    <div>
      Apply Page
      {/* 
i will create here a form to apply for the job
// first person details with disabled inputs
// 1. name
// 2. email
// 3. phone number

// second job details with disabled inputs
// 1. job title
// 2. job location

// third resume details
// 1. resume pdf
// 2. cover letter
// 3. notes
 */}
    </div>
  );
};

export default ApplyPage;
