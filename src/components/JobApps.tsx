import { Job } from "@/hooks/useCandidate";

const jobApps = [
  { role: 'Software Engineer', company: 'Tech Corp', recruiter: 'John Doe' },
  { role: 'Product Manager', company: 'Innovate Ltd', recruiter: 'Jane Smith' },
  { role: 'Data Analyst', company: 'DataWorks', recruiter: 'Alice Johnson' },
];

export function JobApps({ jobApps, applied }: { jobApps: Job[], applied: boolean }) {
  return (
    <div className="p-4 w-xl">
      {jobApps.filter(job => job.applied === applied)
      .map((job, index) => ( 
        <div key={index} className="mb-4 p-4 border rounded-lg">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col items-start">
              <p className="">{job.title}</p>
              <p className="">{job.company}</p>
            </div>
            <div className="flex flex-col items-end">
              <p >Point of Contact:</p>
              <p className="">{job.pointOfContact}</p>
            </div>    
          </div>
        </div>
      ))}
    </div>
  );
} 