"use client";

import React from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { Job } from '@/hooks/useCandidate';

export default function JobPosting() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const company = searchParams.get("company");
  const pointOfContact = searchParams.get("pointOfContact");
  const pointOfContactEmail = searchParams.get("pointOfContactEmail");
  const location = searchParams.get("location");
  const postedDate = searchParams.get("postedDate");
  const applied: boolean =  true ? searchParams.get("applied") === 'true' : false;
  const description = searchParams.get("description");

  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl font-bold ml-8 mt-8 gradient-text">Pinnacle</h1>
      <div className="max-w-2xl w-full flex flex-col mx-auto">
        <div>
            <button 
                onClick={() => router.push('/')} 
                className="mt-4 border rounded-lg py-1 px-3 font-bold rounded self-start text-left mt-12 mb-4 cursor-pointer hover:cursor-pointer"
            >
                Back
            </button>
        </div>
        <div className="max-w-2xl w-full mx-auto mb-4 p-4 border rounded-lg">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col items-start">
                    <p className="text-2xl font-bold">{title}</p>
                    <p>{company} | {location} | {postedDate}</p>
                    <p className="mt-4 max-w-md">{description}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p>Point of Contact:</p>
                    <p>{pointOfContact}</p>
                    <a href={`mailto:${pointOfContactEmail}`} className='underline'>{pointOfContactEmail}</a>
                </div>    
            </div>    
            
            <button 
                disabled={applied}
                className={`mt-4 border rounded-lg py-1 px-3 font-bold rounded self-start text-left mt-12 mb-4 ${
                    applied ? 'text-gray-400 cursor-default' : 'cursor-pointer hover:cursor-pointer'
                }`}
            >
                {applied ? 'Already Applied' : 'Apply'}
            </button>
        </div>
      </div>
    </div>
  );
} 