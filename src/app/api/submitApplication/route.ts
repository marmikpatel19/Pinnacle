import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            candidateGreenhouseId,
            jobGreenhouseId,
            candidateFirstName,
            candidateLastName,
            candidateEmail,
            candidatePhone,
            candidateResume,
            candidateLink,
            candidateResumeFileName
        } = body;

        const applicationData = {
            first_name: candidateFirstName,
            last_name: candidateLastName,
            email_addresses: [{ value: candidateEmail, "type": "work" }],
            phone_numbers: [{ value: candidatePhone, type: 'mobile' }],
            website_addresses: [{ value: candidateLink, "type": "personal" }],
            applications: [
              {
                job_id: jobGreenhouseId,
                attachments: [
                  {
                      filename: candidateResumeFileName,
                      type: "resume",
                      content: candidateResume,
                      content_type: "application/pdf"
                  }
                ]
              }
            ]
        }

        try {
            const applicationResponse = await fetch(`https://harvest.greenhouse.io/v1/candidates`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${Buffer.from(process.env.API_KEY + ':').toString('base64')}`,
                  'On-Behalf-Of': candidateGreenhouseId
              },
              body: JSON.stringify(applicationData)
          });

            const applicationResponseData = await applicationResponse.json();

            if (!applicationResponse.ok) {
                return NextResponse.json(
                    { error: 'Request failed, :', applicationResponseData },
                    { status: 500 }
                );
            } 

            return NextResponse.json({ applicationResponseData}, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: 'Internal server error:', error }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error parsing request body', error }, { status: 400 });
    }
}
