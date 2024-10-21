'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, useTheme } from '@mui/material';
import { useUserProfileContext } from './userProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePicture from './profilePicture';
import countryList from './country.json'; // Import country list from JSON file
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { updateUser } from './updateUser';
import { useSession } from 'next-auth/react';
import { UserAccountDetails } from '@/types';

export interface UserProfileProps {
  id: string;
}

type UserProfileInfo = {
  field_first_name: string;
  field_last_name: string;
  email: string;
  field_dob: string;
  field_phone_number: string;
  field_street: string;
  field_city: string;
  field_country: string;
  field_state_region: string;
  field_postal_code: string;
};

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const userProfileContext = useUserProfileContext();
  const [emailInvalid, setEmailInvalid] = useState(false);
  const { data: session, status, update } = useSession();
  const [updateProfileBtn, setUpdateProfileBtn] = useState(false);
  // Single state for both profile and address
  const [profileInfo, setProfileInfo] = useState<UserProfileInfo>({
    field_first_name: '',
    field_last_name: '',
    field_dob: '',
    email: '',
    field_phone_number: '',
    field_street: '',
    field_city: '',
    field_country: '',
    field_state_region: '',
    field_postal_code: '',
  });

  const [editableField, setEditableField] = useState<string | null>(null); // Track which field is editable

  useEffect(() => {
    if (userProfileContext.userProfile) {
      const {
        field_first_name, field_last_name, mail, field_phone_number, field_dob,
        field_street, field_city, field_state_region, field_postal_code, field_country,
      } = userProfileContext.userProfile;

      setProfileInfo({
        field_first_name: field_first_name[0]?.value || '',
        field_last_name: field_last_name[0]?.value || '',
        email: mail[0]?.value || '',
        field_phone_number: field_phone_number[0]?.value || '',
        field_dob: field_dob[0]?.value || '',
        field_street: field_street[0]?.value || '',
        field_city: field_city[0]?.value || '',
        field_country: field_country[0]?.value || '',
        field_state_region: field_state_region[0]?.value || '',
        field_postal_code: field_postal_code[0]?.value || '',
      });
    }
  }, [userProfileContext]);
  
  const validateAlphanumeric = (value: string): boolean => {
    const alphanumericRegex = /^[a-zA-Z0-9-\s]*$/; // Added \s to allow spaces
    return alphanumericRegex.test(value);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const handleInputClick = (field: string) => {
    setEditableField(field); // Set the field to be editable
  };

 

  const handleInputBlur = (field: keyof UserProfileInfo, value: string) => {
    if (field === 'email' && !validateEmail(value)) {
      setEmailInvalid(true);
      return; // Prevent invalid email from being saved
    }
    setEmailInvalid(false);

    if (field === 'field_dob') {
      value = dayjs(value).format('YYYY-MM-DD');
      console.log(value);
    }

    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });

    const updatedProfile = { ...userProfileContext.userProfile };
  
    if (!updatedProfile) return;
  
    // Update specific fields
    switch (field) {
      case 'field_first_name':
        updatedProfile.field_first_name = [{ value }];
        break;
      case 'field_last_name':
        updatedProfile.field_last_name = [{ value }];
        break;
      case 'email':
        updatedProfile.mail = [{ value }];
        break;
      case 'field_dob':
        updatedProfile.field_dob = [{ value: dayjs(value).format('YYYY-MM-DD') }];
        break;
      case 'field_phone_number':
        updatedProfile.field_phone_number = [{ value }];
        break;
      case 'field_street':
        updatedProfile.field_street = [{ value }];
        break;
      case 'field_city':
        updatedProfile.field_city = [{ value }];
        break;
      case 'field_state_region':
        updatedProfile.field_state_region = [{ value }];
        break;
      case 'field_postal_code':
        updatedProfile.field_postal_code = [{ value }];
        break;
      case 'field_country':
        updatedProfile.field_country = [{ value }];
        break;
      default:
        break;
    }
  
    // Update the profile in context
    userProfileContext.setUserProfile(updatedProfile as UserAccountDetails);
  
    setUpdateProfileBtn(true); // Enable save button
    setEditableField(null); // Revert to read-only when losing focus
  };
  

  const handleProfileChange = (field: keyof UserProfileInfo, value: string) => {
    if (field !== 'email' && field !== 'field_country' && field !== 'field_dob') {
      if (!validateAlphanumeric(value)) {
        return; // Don't update state if invalid input
      }
    }

    if (field === 'field_dob') {
      value = dayjs(value).format('YYYY-MM-DD');
      const updatedProfile = { ...userProfileContext.userProfile };
  
      if (!updatedProfile) return;
    
      // Update specific fields
      switch (field) {
        case 'field_dob':
          updatedProfile.field_dob = [{ value: value}];
          break;
        default:
          break;
      }
    
      // Update the profile in context
      userProfileContext.setUserProfile(updatedProfile as UserAccountDetails);
      setUpdateProfileBtn(true); // Enable save button
    }

    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });

    
  
    
  };

  const saveProfile = () => {
    console.log('saveProfile*********', userProfileContext.userProfile);
    const userUpdateResponse =userProfileContext.userProfile?.uid ? updateUser(userProfileContext.userProfile?.uid[0].value, userProfileContext.userProfile) : null;
      if(userUpdateResponse) {
        userUpdateResponse.then(async (data: any) => {
          console.log('userUpdateResponse********', data);
          //updateAccessToken();
          const updatedUser = await update();
          if(updatedUser){
            console.log('updatedUser********', updatedUser);}
        })
      } 
  };

 

  return (
    <Box className="flex md:space-x-4 md:space-y-0 space-y-4 md:flex-row flex-col">
      <Box className="flex-none md:w-1/3 w-full">
        <Paper className="p-4">
            <ProfilePicture  />
          <Box component="div" className="flex justify-center items-center">
            {profileInfo.field_first_name} {profileInfo.field_last_name}
          </Box>
        </Paper>
      </Box>
      <Box className="grow w-full md:w-2/3">
        <Paper>
          {/* First Name */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">First Name</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_first_name')}
                onBlur={(e) => handleInputBlur('field_first_name', e.target.value)}
                onChange={(e) => handleProfileChange('field_first_name', e.target.value)}
                value={profileInfo.field_first_name}
                readOnly={editableField !== 'field_first_name'}
                className="w-full"
                placeholder='Enter your first name'
              />
            </Box>
          </Box>

          {/* Last Name */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">Last Name</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_last_name')}
                onBlur={(e) => handleInputBlur('field_last_name', e.target.value)}
                onChange={(e) => handleProfileChange('field_last_name', e.target.value)}
                value={profileInfo.field_last_name}
                readOnly={editableField !== 'field_last_name'}
                className="w-full"
                placeholder='Enter your last name'
              />
            </Box>
          </Box>

          {/* Email */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">Email</Box>
            <Box className="grow text-align-left">
              <input
                type="email"
                onClick={() => handleInputClick('email')}
                onBlur={(e) => handleInputBlur('email', e.target.value)}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                value={profileInfo.email}
                readOnly={editableField !== 'email'}
                className="w-full"
                placeholder='Enter Email Address'
              />
              {emailInvalid && <Box component="p" className="mt-2 text-sm text-pink-600">Please enter a valid email address.</Box>}
            </Box>
          </Box>

          {/* DOB */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">DOB</Box>
            <Box className="grow text-align-left">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  className="float-left"
                  value={dayjs(profileInfo.field_dob)}
                  onChange={(newValue) => handleProfileChange('field_dob', newValue!.toString())}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* Phone */}
          <Box className="flex md:space-x-4 p-2">
            <Box className="w-32">Phone</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_phone_number')}
                onBlur={(e) => handleInputBlur('field_phone_number', e.target.value)}
                onChange={(e) => handleProfileChange('field_phone_number', e.target.value)}
                value={profileInfo.field_phone_number}
                readOnly={editableField !== 'field_phone_number'}
                className="w-full"
              />
            </Box>
          </Box>
        </Paper>

        <Paper className="mt-4">
          {/* Street */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">Street</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_street')}
                onBlur={(e) => handleInputBlur('field_street', e.target.value)}
                onChange={(e) => handleProfileChange('field_street', e.target.value)}
                value={profileInfo.field_street}
                readOnly={editableField !== 'field_street'}
              />
            </Box>
          </Box>

          {/* City */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">City</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_city')}
                onBlur={(e) => handleInputBlur('field_city', e.target.value)}
                onChange={(e) => handleProfileChange('field_city', e.target.value)}
                value={profileInfo.field_city}
                readOnly={editableField !== 'field_city'}
              />
            </Box>
          </Box>

          {/* State/Region */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">State/Region</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_state_region')}
                onBlur={(e) => handleInputBlur('field_state_region', e.target.value)}
                onChange={(e) => handleProfileChange('field_state_region', e.target.value)}
                value={profileInfo.field_state_region}
                readOnly={editableField !== 'field_state_region'}
              />
            </Box>
          </Box>

          {/* Postal Code */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box className="w-32">Postal Code</Box>
            <Box className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('field_postal_code')}
                onBlur={(e) => handleInputBlur('field_postal_code', e.target.value)}
                onChange={(e) => handleProfileChange('field_postal_code', e.target.value)}
                value={profileInfo.field_postal_code}
                readOnly={editableField !== 'field_postal_code'}
              />
            </Box>
          </Box>

          {/* Country */}
          <Box className="flex md:space-x-4 p-2">
            <Box className="w-32">Country</Box>
            <Box className="grow text-align-left relative">
              <select
                onBlur={(e) => handleInputBlur('field_country', e.target.value)}
                onChange={(e) => handleProfileChange('field_country', e.target.value)}
                value={profileInfo.field_country}
              >
                <option value="">Select Country</option>
                {countryList.map((country) => (
                  <option key={country.code2} value={country.code2}>
                    {country.code2}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
        </Paper>
        <Button className="mt-4" disabled={!updateProfileBtn} onClick={saveProfile}>Update Profile</Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
