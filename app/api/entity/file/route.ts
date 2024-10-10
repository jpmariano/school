import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

    // Read the file as an array buffer (or another method depending on your use case)
    const buffer = Buffer.from(await file.arrayBuffer());

    // Specify where to store the file
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, file.name);

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Write the file to the directory
    await fs.writeFile(filePath, buffer);

    // Respond with success
    return NextResponse.json({ message: 'File uploaded successfully!', fileName: file.name });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
