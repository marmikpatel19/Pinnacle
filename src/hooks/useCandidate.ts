import { useState, useEffect } from "react";

type Candidate = {
    name: string;
    email: string;
    phone: string | null;
    link: string | null;
    resume: string | null; // update this to be a file
}

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
    return {
        candidate: {
            name: "Jeffrey Li",
            email: "Jeffrey@paraform.com",
            phone: "+1234567890",
            link: "https://x.com/lijeffrey39",
            resume: ""
        },
        isLoading: false,
        error: null
    }
}

export default useCandidate;