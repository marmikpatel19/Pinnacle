"use client";

import { useState, useEffect } from "react";

export type Candidate = {
    id: string;
    greenhouseId: string;
    name: string;
    email: string;
    phone: string | null;
    link: string | null;
    resume: string | null; // update this to be a file
    jobs: Job[];
}

export type Job = {
    id: string;
    greenhouseId: string;
    title: string;
    company: string;
    pointOfContact: string;
    pointOfContactEmail: string;
    location: string;
    postedDate: string;
    applied: boolean;
    description: string;
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
            greenhouseId: "4280249007",
            title: "Staff Engineer (ChatGPT Premium)",
            company: "OpenAI",
            pointOfContact: "Kalie Scoren",
            pointOfContactEmail: "kalie@openai.com",
            location: "San Francisco, CA",
            postedDate: "2025-03-01",
            applied: false,
            description: "The Growth team at OpenAI is responsible for expanding the reach and impact of our AI products, including ChatGPT and other offerings. We focus on optimizing user acquisition, subscriptions, engagement, and retention, ensuring that millions of users find long-term value in our products."
        },
        {
            id: "2",
            greenhouseId: "4280249007",
            title: "Member of Technical Staff", 
            company: "Anthropic",
            pointOfContact: "Arjun Shubham",
            pointOfContactEmail: "arjun@anthropic.com",
            location: "New York, NY",
            postedDate: "2025-01-06",
            applied: false,
            description: "We are looking for a Member of Technical Staff to join our team. This is a great opportunity for someone who is passionate about building scalable and efficient web applications."
        },
        {
            id: "3",
            greenhouseId: "4280249007",
            title: "Staff Engineer", 
            company: "Paraform",
            pointOfContact: "Linus Lu",
            pointOfContactEmail: "linus@paraform.com",
            location: "San Francisco, CA",
            postedDate: "2025-01-01",
            applied: false,
            description: "We are looking for a Staff Engineer to join our team. This is a great opportunity for someone who is passionate about building scalable and efficient web applications."
        },
        {
            id: "4",
            greenhouseId: "4280249007",
            title: "Staff Engineer", 
            company: "Meta",
            pointOfContact: "Jason Liu",
            pointOfContactEmail: "jason@meta.com",
            location: "New York, NY",
            postedDate: "2025-01-01",
            applied: true,
            description: "We are looking for a Staff Engineer to join our team. This is a great opportunity for someone who is passionate about building scalable and efficient web applications."
        },
        {
            id: "5",
            greenhouseId: "4280249007",
            title: "Staff Engineer (Backend)", 
            company: "Google",
            pointOfContact: "Grace Wong",
            pointOfContactEmail: "grace@google.com",
            location: "San Francisco, CA",
            postedDate: "2025-01-01",
            applied: true,
            description: "We are looking for a Staff Engineer to join our team. This is a great opportunity for someone who is passionate about building scalable and efficient web applications."
        }
    ];

    return {
        candidate: {
            id: "123",
            greenhouseId: "4280249007",
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