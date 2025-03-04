'use client';

import { JobApps } from "@/components/JobApps";
import useCandidate from "../hooks/useCandidate";

export default function Home() {
  const {candidate, isLoading, error} = useCandidate();
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading your candidate profile...</p>
      </div>
    );
  }

  if (error) {
    return ( 
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Pinnacle</h1>
      <div className="max-w-xl w-full flex flex-col items-center text-center mx-auto">   
        <h1 className="text-2xl mt-4">Welcome back, {candidate.name}</h1>
        <h1 className="self-start text-left mt-12 ml-4">
          Invitations:
        </h1>
        <JobApps jobApps={candidate.jobs} applied={false} />
        <h1 className="self-start text-left mt-4 ml-4">
          Past applications:
        </h1>
        <JobApps jobApps={candidate.jobs} applied={true}/>
      </div>
    </div>
  );
  
}
