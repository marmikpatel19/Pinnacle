"use client";

import React, { useState } from 'react';
import { useSearchParams, useRouter } from "next/navigation";

export default function JobPosting() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const company = searchParams.get("company");
  const pointOfContact = searchParams.get("pointOfContact");
  const pointOfContactEmail = searchParams.get("pointOfContactEmail");
  const location = searchParams.get("location");
  const postedDate = searchParams.get("postedDate");
  const [applied, setApplied] = useState<boolean>(true ? searchParams.get("applied") === 'true' : false)  
  const description = searchParams.get("description");
  const jobGreenhouseId = searchParams.get("jobGreenhouseId");
  
  const candidateGreenhouseId = searchParams.get("candidateGreenhouseId");
  const candidateFirstName = searchParams.get("candidateFirstName");
  const candidateLastName = searchParams.get("candidateLastName");
  const [candidateEmail, setCandidateEmail] = useState(searchParams.get("candidateEmail")); 
  const [candidatePhone, setCandidatePhone] = useState(searchParams.get("candidatePhone"));
  const [candidateLink, setCandidateLink] = useState(searchParams.get("candidateLink"));
  const [candidateResume, setCandidateResume] = useState(searchParams.get("candidateResume")); // stored in base64
  const [candidateResumeFileName, setCandidateResumeFileName] = useState<string | null>(null);

  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const toggleEdit = () => setIsEditOpen(!isEditOpen);

  const submitApplication = async () => {
    try {
      const response = await fetch("/api/submitApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateGreenhouseId,
          jobGreenhouseId,
          candidateFirstName,
          candidateLastName,
          candidateEmail,
          candidatePhone,
          candidateLink,
          candidateResume,
          candidateResumeFileName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setApplied(true);
        alert("Application submitted successfully!");
        setIsEditOpen(false);
      } else {
        console.error("Application submission failed:", data.error);
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const resume = event.target.files?.[0];
    if (!resume) {
        return;
    }
    if (resume.type !== "application/pdf") {
      alert("PDF files only");
      return;
    }

    setCandidateResumeFileName(resume.name);

    const reader = new FileReader();
    reader.readAsDataURL(resume);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCandidateResume(reader.result.split(",")[1]); 
    };
    reader.onerror = () => alert("Error reading file");
  };
};

  return (
    <div>
      <h1 className="text-3xl font-bold ml-8 mt-8 gradient-text cursor-pointer" onClick={() => window.location.href = "/"}>Pinnacle</h1>
      <div className="max-w-2xl w-full flex flex-col mx-auto px-4 sm:px-0">
        <div>
            <button 
                onClick={() => router.push('/')} 
                className="mt-4 border rounded-lg py-1 px-3 font-bold rounded self-start text-left mt-12 mb-4 cursor-pointer"
            >
                Back
            </button>
        </div>
        <div className="max-w-2xl w-full mx-auto mb-4 p-3 sm:p-4 border rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
                <div className="flex flex-col items-start">
                    <p className="text-2xl font-bold">{title}</p>
                    <p className="text-sm sm:text-base">{company} | {location} | {postedDate}</p>
                    <p className="mt-4 max-w-md text-sm sm:text-base">{description}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                    <p>Point of Contact:</p>
                    <p>{pointOfContact}</p>
                    <a href={`mailto:${pointOfContactEmail}`} className='underline'>{pointOfContactEmail}</a>
                </div>    
            </div>    
            
            <div className="flex flex-col mt-6">
                <p 
                    onClick={toggleEdit} 
                    className="underline cursor-pointer"
                >
                    Edit Application <span className="text-xs">{isEditOpen ? '▲' : '▼'}</span>
                </p>
                {isEditOpen && (
                    <div className="mt-4">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="flex flex-col items-start w-full sm:w-1/2">
                                <p>Email:</p>
                                <input type="email" value={candidateEmail || ''} onChange={(e) => setCandidateEmail(e.target.value)} className="border rounded-lg p-2 mb-2 w-full" />
                                <p>Phone:</p>
                                <input type="tel" value={candidatePhone || ''} onChange={(e) => setCandidatePhone(e.target.value)}  className="border rounded-lg p-2 mb-2 w-full" />
                            </div>
                            <div className="flex flex-col items-start w-full sm:w-1/2">
                                <p>Link:</p>
                                <input type="url" value={candidateLink || ''} onChange={(e) => setCandidateLink(e.target.value)} className="border rounded-lg p-2 mb-2 w-full" />
                                <p>Resume:</p>
                                <input type="file" accept="application/pdf" onChange={handleFileChange} className="border rounded-lg p-2 mb-2 cursor-pointer w-full"/>          
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
            <button 
                disabled={applied}
                onClick={() => submitApplication()}
                className={`mt-6 border rounded-lg py-1 px-3 font-bold rounded self-start text-left ${
                    applied ? 'text-gray-400 cursor-default' : 'cursor-pointer'
                }`}
            >
                {applied ? 'Already Applied' : 'Apply'}
            </button>
        </div>
      </div>
    </div>
  );
}