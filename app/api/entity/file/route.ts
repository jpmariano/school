import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { CustomSession } from '@/types';
import { authOptions } from '@/utils/authOptions';

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

    // Specify where to store the file locally
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, file.name);

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the local directory
    await fs.writeFile(filePath, buffer);

    const session = await getServerSession(authOptions) as CustomSession;
    
    if (!session) {
        return NextResponse.json({ message: 'No session' }, { status: 500 });
    }

    

    const headers = new Headers();
    headers.append("Content-Type", "application/hal+json");
    headers.append("Authorization", `Bearer ${session.user.access_token}`);
    headers.append("X-CSRF-Token", `${session.user.drupal_session}`);


    const drupalFileData = JSON.stringify({
      "_links": {
        "type": {
          "href": `${process.env.NEXT_PUBLIC_API_URL}/rest/type/file/image` 
        }
      },
      "filename": [
        {
          "value": file.name
        }
      ],
      "uri": [
        {
          "value": `private://uploads/${file.name}` // Adjust according to your Drupal file system setup
        }
      ],
      "data": [
        {
          "value": buffer.toString('base64') // Base64 encoding for file upload
        }
      ]
    });

    // Send the file to Drupal
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entity/file?_format=hal_json`, {
      method: 'POST',
      headers: headers,
      body: drupalFileData,
    });

    if (!response.ok) {
      //throw new Error(`HTTP error! status: ${response.status}`);
      return NextResponse.json({ message: 'something went wrong uploading the file' }, { status: response.status });
    }
    return response; 

  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
