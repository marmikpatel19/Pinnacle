'use client';

import { Job, Candidate } from "@/hooks/useCandidate";
import { useRouter } from "next/navigation";

export function JobApps({ jobApps, applied, candidate }: { jobApps: Job[], applied: boolean, candidate: Candidate }) {
  const router = useRouter();

  return (
    <div className="p-3 sm:p-4 w-full max-w-xl mx-auto">
      {jobApps.filter(job => job.applied === applied)
      .map((job, index) => ( 
        <div key={index} className="mb-4 p-3 sm:p-4 border rounded-lg cursor-pointer" onClick={() => router.push(`/jobposting?id=${job.id}&title=${(job.title)}&company=${(job.company)}&pointOfContact=${(job.pointOfContact)}&applied=${job.applied}&location=${(job.location)}&postedDate=${(job.postedDate)}&description=${(job.description)}&pointOfContactEmail=${(job.pointOfContactEmail)}&jobGreenhouseId=${job.greenhouseId}&candidateFirstName=${(candidate.firstName)}&candidateLastName=${(candidate.lastName)}&candidateEmail=${(candidate.email)}&candidatePhone=${(candidate.phone)}&candidateLink=${(candidate.link)}&candidateResume=${(candidate.resume)}&candidateGreenhouseId=${(candidate.greenhouseId)}`)}>
          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
            <div className="flex flex-col items-start">
              <p>{job.title}</p>
              <p>{job.company}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <p>Point of Contact:</p>
              <p>{job.pointOfContact}</p>
            </div>    
          </div>
        </div>
      ))}
    </div>
  );
} 