// app/components/FileUploadForm.tsx
"use client"
import { DrupalFile } from '@/types';
import React, { useState } from 'react';

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await fetch('/api/entity/file', {
        method: 'POST',
        body: formData,
      });
      const data: DrupalFile = await response.json();
      if (response.ok) {
        alert('File uploaded successfully!');
        console.log('File uploaded successfully!', data);
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred during file upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  );
};

export default FileUploadForm;
