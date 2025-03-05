'use client';

import { JobApps } from "@/components/JobApps";
import useCandidate from "../hooks/useCandidate";

export default function Home() {
  const {candidate, isLoading, error} = useCandidate();
  
  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold ml-8 mt-8 gradient-text">Pinnacle</h1>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4">Loading your candidate profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return ( 
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
        <p>Please try again later</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold ml-8 mt-8 gradient-text">Pinnacle</h1>
      <div className="max-w-xl w-full flex flex-col items-center text-center mx-auto">   
        <h1 className="text-2xl mt-4 ">Welcome back, {candidate.firstName}</h1>
        <h1 className="self-start text-left mt-12 ml-4">
          Active Invitations:
        </h1>
        <JobApps jobApps={candidate.jobs} candidate={candidate} applied={false} />
        <h1 className="self-start text-left mt-4 ml-4 ">
          Past applications:
        </h1>
        <JobApps jobApps={candidate.jobs} candidate={candidate} applied={true}/>
      </div>
    </div>
  );
}
