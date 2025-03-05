import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Request must be a POST' });
    }
  
    const {
      candidateGreenhouseId,
      jobGreenhouseId,
      candidateName,
      candidateEmail,
      candidatePhone,
      candidateResume,
      candidateLink,
      // add other necessary fields
    } = req.body;

    const apiKey = '';

    const applicationData = {
        job_id: jobGreenhouseId,
        attachments : [
            {
            "filename" : "resume.pdf",
            "type" : "resume",
            "content" : "R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs...",
            "content_type" : "application/pdf"
            }
        ]
    };

    const candidateData = {
        first_name: candidateName.split(' ')[0],
        last_name: candidateName.split(' ').slice(1).join(' '),
        email_addresses: [{value: candidateEmail}],
        phone_numbers: [{ value: candidatePhone, type: 'mobile' }],
        website_addresses: [{value: candidateLink}],
    }

    try {
        const [applicationResponse, candidateResponse] = await Promise.all([
            fetch(`https://harvest.greenhouse.io/v1/candidates${candidateGreenhouseId}/applications`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
                  'On-Behalf-Of': candidateGreenhouseId
                },
                body: JSON.stringify(applicationData)
              }),
              fetch(`https://harvest.greenhouse.io/v1/candidates${candidateGreenhouseId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
                  'On-Behalf-Of': candidateGreenhouseId
                },
                body: JSON.stringify(candidateData)
              })
        ]);

        const applicationResponseData = await applicationResponse.json();
        const candidateResponseData = await candidateResponse.json();

        if (!applicationResponse.ok || !candidateResponse.ok) {
            return res.status(500).json({ error: 'One or both requests failed', applicationResponseData, candidateResponseData });
        }
    
        return res.status(200).json({ applicationResponseData, candidateResponseData });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error:', error });
    }
  }
