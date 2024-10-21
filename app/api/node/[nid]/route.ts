import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions"; // adjust the path as needed
import { CustomSession, ErrorResponse } from '@/types';
type ResponseData = {
  message: string
}
 
export async function GET(request: NextRequest, { params }: { params: { nid: string } }) : Promise<Response|ErrorResponse>  {
  const { searchParams } = new URL(request.url);
  
  // Extract the 'nid' parameter from the query
  const nid = searchParams.get('nid');

  if (!nid) {
    return NextResponse.json({ message: 'No NID provided' }, { status: 400 });
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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node/${nid}?_format=json`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'something went wrong getting node' }, { status: response.status });
    }
    return response;
    //const result = await response.json();
    //return NextResponse.json(result);
 
  } catch (error) {
    return NextResponse.json({ message: 'something went wrong' }, { status: 500 });
  }
}


