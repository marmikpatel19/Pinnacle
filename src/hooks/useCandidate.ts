"use client";

import { useState, useEffect } from "react";

type Candidate = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    link: string | null;
    resume: string | null; // update this to be a file
    jobs: Job[];
}

export type Job = {
    id: string;
    title: string;
    company: string;
    pointOfContact: string;
    location: string;
    postedDate: string;
    applied: boolean;
};

const MOCK_API_ROUTE = "https://backend/api/candidate/id";

const useCandidate = () => {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCandidate = async () => {
            try{
                const res = await fetch(MOCK_API_ROUTE, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) {
                    setError(`Error ${res.status}: ${res.statusText}`);
                }
                  
                const data: Candidate = await res.json();
                setCandidate(data);
            }
            catch(e: unknown){
                setError(e instanceof Error ? e.message : 'Unknown error');
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchCandidate();
    }, []);

    // return { candidate, isLoading, error };
    // return mock data
    const mockJobs: Job[] = [
        {
            id: "1",
            title: "Staff Engineer (Web)",
            company: "OpenAI",
            pointOfContact: "Kalie Scoren",
            location: "New York",
            postedDate: "2025-01-01",
            applied: false
        },
        {
            id: "2",
            title: "Member of Technical Staff", 
            company: "Anthropic",
            pointOfContact: "Arjun Shubham",
            location: "San Francisco",
            postedDate: "2025-01-01",
            applied: false
        },
        {
            id: "3",
            title: "Staff Engineer", 
            company: "Paraform",
            pointOfContact: "Linus Lu",
            location: "San Francisco",
            postedDate: "2025-01-01",
            applied: false
        },
        {
            id: "4",
            title: "Staff Engineer", 
            company: "Meta",
            pointOfContact: "Jason Liu",
            location: "San Francisco",
            postedDate: "2025-01-01",
            applied: true
        },
        {
            id: "5",
            title: "Staff Engineer (Backend)", 
            company: "Google",
            pointOfContact: "Grace Wong",
            location: "San Francisco",
            postedDate: "2025-01-01",
            applied: true
        }
    ];

    return {
        candidate: {
            id: "123",
            name: "Jeffrey",
            email: "Jeffrey@paraform.com",
            phone: "+1234567890",
            link: "https://x.com/lijeffrey39",
            resume: "",
            jobs: mockJobs
        },
        isLoading: false,
        error: null
    }
}

export default useCandidate;