import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { CustomSession, CompletedLesson, CompletedCourse } from '@/types';

export async function PATCH(req: NextRequest, { params }: { params: { nid: string } }) {
  try {
    const { nid } = params;

    if (!nid) {
      return NextResponse.json({ message: 'nid parameter is required' }, { status: 400 });
    }
    
    const completedCourseRaw = await req.json();
    const completedCourse = completedCourseRaw as CompletedCourse;

    if (!completedCourse) {
      return NextResponse.json({ message: 'Completed course json not found' }, { status: 400 });
    }

    const session = await getServerSession(authOptions) as CustomSession;

    if (!session) {
      return NextResponse.json({ message: 'No session' }, { status: 401 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.user.access_token}`
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node/${nid}?_format=json`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(completedCourse),
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Lesson updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: 500 });
  }
}
