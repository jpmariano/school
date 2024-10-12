import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions";
import { CustomSession, CompletedLesson, CompletedCourse, UserAccountDetails, UserPicture } from '@/types';
import { getSessionToken, isFetchResponse } from '@/api/drupal';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'id parameter is required' }, { status: 400 });
    }
    //userPicture: UserPicture
    const userPictureRaw = await req.json();
    const userPicture = userPictureRaw as UserPicture;

    if (!userPicture) {
      return NextResponse.json({ message: 'userPicture json not found' }, { status: 400 });
    }

    const session = await getServerSession(authOptions) as CustomSession;

    if (!session) {
      return NextResponse.json({ message: 'No session' }, { status: 401 });
    }

    // Get the CSRF token from Drupal API
    /*
    const drupalSessionResponse = await getSessionToken();
    if (!isFetchResponse(drupalSessionResponse)) {
      return NextResponse.json({ message: 'getSessionToken failed' }, { status: 500 });
    }
    const drupalSessionToken = await drupalSessionResponse.text(); */

   

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${session.user.access_token}`);
    headers.append("X-CSRF-Token", session.user.drupal_session);
    console.log("userPicture********************", userPicture);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}?_format=json`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(userPicture),
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'something went wrong updating user' }, { status: response.status });
    }

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: 500 });
  }
}
