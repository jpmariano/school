import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions"; // adjust the path as needed
import { CustomSession, PostSubscription } from '@/types';
type ResponseData = {
  message: string
}
 


export async function POST(req: NextRequest) {
    try {
      // Retrieve and parse the JSON body from the request
      const subcriptionRaw = await req.json();
      const newSubcription = subcriptionRaw as PostSubscription;
      if (!newSubcription) {
        return NextResponse.json({ message: 'New Subcription json not found' }, { status: 400 });
      }
      
      try {
      
        const session = await getServerSession(authOptions) as CustomSession;
    
        if (!session) {
            return NextResponse.json({ message: 'No session' }, { status: 500 });
        }
    
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.access_token}`
        };
        //return NextResponse.json({ message: completedLesson }, { status: 200 });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node?_format=json`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(newSubcription)
        });
    
        if (!response.ok) {
          //throw new Error(`HTTP error! status: ${response.status}`);
          return NextResponse.json({ message: 'something went wrong subscribing' }, { status: response.status });
        }
        return response; 
        
      } catch (error) {
        return NextResponse.json({ message: 'something went wrong subscribing' }, { status: 500 });
      }
    } catch (error) {
      // In case of parsing error or unexpected issues
      return NextResponse.json({ message: 'Invalid PostSubscription JSON or error parsing body' }, { status: 400 });
    }
}

