// app/components/FileUploadForm.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { DrupalFile, UserAccountDetails, UserPicture } from '@/types';
import PatchUserProfile from './updateUserProfile';
import { useUserProfileContext } from '../userProfile/userProvider';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
interface FileUploadFormProps {
  userProfile: UserAccountDetails;
}

const FileUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userProfileContext = useUserProfileContext();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (userProfileContext.userProfile) {
      // Logic for userProfile if needed
    }
  }, [userProfileContext]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      const allowedTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];

      // Validate file type
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a valid image file (png, gif, jpg, jpeg).');
        setFile(null);  // Reset the file
        return;
      }

      setError(null);  // Clear previous errors if the file is valid
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a valid file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await fetch('/api/file/upload/user/user/user_picture', {
        method: 'POST',
        body: formData,
      });
      const data: DrupalFile = await response.json();
      if (response.ok) {
        console.log('File uploaded successfully!', data);

        if (data.fid) {
          const newuserPicture: UserPicture = {
            uid: userProfileContext.userProfile?.uid!,
            uuid: userProfileContext.userProfile?.uuid!,
            user_picture: [{ target_id: data.fid[0].value, alt: "user profile picture" }],
          };
          /*
          const existingPicture = userProfileContext.userProfile?.user_picture?.[0];
          const updatedProfile = { ...userProfileContext.userProfile };

          if (existingPicture) {
            updatedProfile.user_picture = [
              {
                ...existingPicture,
                target_id: data.fid[0].value,
                alt: "user profile picture",
              },
            ];
          } else {
            updatedProfile.user_picture = [{ target_id: data.fid[0].value, alt: "user profile picture" }];
          }

          userProfileContext.setUserProfile(updatedProfile as UserAccountDetails); */
          const PatchUserProfileResponse = PatchUserProfile(userProfileContext.userProfile?.uid[0].value!, newuserPicture);
          PatchUserProfileResponse.then(async (data) => {
              console.log("PatchUserProfileResponse************", data);
              const updatedUser = await update();
              if(updatedUser){
                console.log('updatedUser********', updatedUser);}
              }); 
        } else {
          console.log('Error uploading file:', data);
        }
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
    <Box component="form" onSubmit={handleSubmit} className='relative'>
      <Box className="absolute top-0">
        <label for="file-input">
          <CameraAltIcon />
        </label>
        <input id="file-input" type="file" onChange={handleFileChange} className='hidden'/>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        {file && !error && (
          <Box component="button" type="submit" disabled={uploading} sx={{ mt: 3}}>
            {uploading ? 'Uploading...' : 'Upload File'}
          </Box>
        )}
    </Box>
  );
};

export default FileUploadForm;
