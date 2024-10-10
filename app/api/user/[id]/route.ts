import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { CustomSession, CompletedLesson, CompletedCourse, UserAccountDetails } from '@/types';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'id parameter is required' }, { status: 400 });
    }
    
    const userAccountDetailsRaw = await req.json();
    const userAccountDetails = userAccountDetailsRaw as UserAccountDetails;

    if (!userAccountDetails) {
      return NextResponse.json({ message: 'User Account Details json not found' }, { status: 400 });
    }

    const session = await getServerSession(authOptions) as CustomSession;

    if (!session) {
      return NextResponse.json({ message: 'No session' }, { status: 401 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.user.access_token}`
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}?_format=json`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(userAccountDetails),
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'something went wrong updating user' }, { status: response.status });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: 500 });
  }
}
