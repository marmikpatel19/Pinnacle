'use client';

import { Job, Candidate } from "@/hooks/useCandidate";
import { useRouter } from "next/navigation";

export function JobApps({ jobApps, applied, candidate }: { jobApps: Job[], applied: boolean, candidate: Candidate }) {
  const router = useRouter();

  return (
    <div className="p-4 w-xl">
      {jobApps.filter(job => job.applied === applied)
      .map((job, index) => ( 
        <div key={index} className="mb-4 p-4 border rounded-lg cursor-pointer hover:cursor-pointer" onClick={() => router.push(`/jobposting?id=${job.id}&title=${(job.title)}&company=${(job.company)}&pointOfContact=${(job.pointOfContact)}&applied=${job.applied}&location=${(job.location)}&postedDate=${(job.postedDate)}&description=${(job.description)}&pointOfContactEmail=${(job.pointOfContactEmail)}&candidateName=${(candidate.name)}&candidateEmail=${(candidate.email)}&candidatePhone=${(candidate.phone)}&candidateLink=${(candidate.link)}&candidateResume=${(candidate.resume)}`)}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start">
              <p>{job.title}</p>
              <p>{job.company}</p>
            </div>
            <div className="flex flex-col items-end">
              <p>Point of Contact:</p>
              <p>{job.pointOfContact}</p>
            </div>    
          </div>
        </div>
      ))}
    </div>
  );
} 