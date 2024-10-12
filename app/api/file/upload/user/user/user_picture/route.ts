import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/types';
import { authOptions } from '@/utils/authOptions';
import { getSessionToken, isFetchResponse } from '@/api/drupal';

export async function POST(req: Request) {
  try {
    // Ensure the request is multipart/form-data
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    // Parse the incoming form data
    const formData = await req.formData();

    // Get the uploaded file from the form data
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 400 });
    }

    // Read the file as an array buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Get session to access the authorization token
    const session = await getServerSession(authOptions) as CustomSession;
    if (!session) {
      return NextResponse.json({ message: 'No session' }, { status: 500 });
    }

    // Get the CSRF token from Drupal API
    /*
    const drupalSessionResponse = await getSessionToken();
    if (!isFetchResponse(drupalSessionResponse)) {
      return NextResponse.json({ message: 'getSessionToken failed' }, { status: 500 });
    }
    const drupalSessionToken = await drupalSessionResponse.text(); */

    // Set the headers as per Postman test
    const headers = new Headers();
    headers.append("Content-Type", "application/octet-stream");
    headers.append("Authorization", `Bearer ${session.user.access_token}`);
    headers.append("Content-Disposition", `file; filename="${file.name}"`);
    headers.append("X-CSRF-Token", session.user.drupal_session);

    // Send the file to Drupal using the new endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/file/upload/user/user/user_picture?_format=json`, {
      method: 'POST',
      headers: headers,
      body: buffer,  // Send the raw file buffer
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Error uploading the file' }, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
