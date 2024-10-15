'use client'
import React, { useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import { useUserProfileContext } from './userProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePicture from './profilePicture';
import countryList from './country.json'; // Import country list from JSON file

export interface UserProfileProps {
  id: string;
}

type UserProfileInfo = {
  firstname: string;
  lastname: string;
  email: string;
  dob: string;
  phone: string;
};

type Address = {
  street: string;
  city: string;
  country: string; // Store code2 value for country
  state: string;
  zip: string;
};

const UserProfile: React.FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const userProfileContext = useUserProfileContext();

  const [profileInfo, setProfileInfo] = useState<UserProfileInfo>({
    firstname: 'No Name Provided',
    lastname: 'No Last Name Provided',
    dob: '',
    email: 'No Email Provided',
    phone: '',
  });

  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    country: '', // Initially empty or populate from context
    state: '',
    zip: '',
  });

  const [editableField, setEditableField] = useState<string | null>(null); // Track which field is editable

  useEffect(() => {
    if (userProfileContext.userProfile) {
      const {
        field_first_name, field_last_name, mail, field_phone_number, field_dob,
        field_street, field_city, field_state_region, field_postal_code, field_country
      } = userProfileContext.userProfile;
      
      setProfileInfo({
        firstname: field_first_name[0]?.value || 'No Name Provided',
        lastname: field_last_name[0]?.value || 'No Last Name Provided',
        email: mail[0]?.value || 'No Email Provided',
        phone: field_phone_number[0]?.value || '',
        dob: field_dob[0]?.value || '',
      });

      setAddress({
        street: field_street[0]?.value || '',
        city: field_city[0]?.value || '',
        country: field_country[0]?.value || '', // Use the country code from context
        state: field_state_region[0]?.value || '',
        zip: field_postal_code[0]?.value || '',
      });
    }
  }, [userProfileContext]);

  const handleInputClick = (field: string) => {
    setEditableField(field); // Set the field to be editable
  };

  const handleInputBlur = () => {
    setEditableField(null); // Revert to read-only when losing focus
  };

  const handleProfileChange = (field: keyof UserProfileInfo, value: string) => {
    setProfileInfo({
      ...profileInfo,
      [field]: value,
    });
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress({
      ...address,
      [field]: value,
    });
  };

  const showPicture = userProfileContext.userProfile ? (
    <ProfilePicture picture={userProfileContext.userProfile.user_picture[0]} />
  ) : (
    <AccountCircleIcon fontSize="large" className='block mx-auto my-0'/>
  );

  return (
    <Box className="flex md:space-x-4 md:space-y-0 space-y-4 md:flex-row flex-col">
      <Box className="flex-none md:w-1/3 w-full">
        <Paper className='p-4'>
          {showPicture}
          <Box component="div" sx={{}} className="flex justify-center items-center">
            {profileInfo.firstname} {profileInfo.lastname}
          </Box>
        </Paper>
      </Box>
      <Box className="grow w-full md:w-2/3">
        <Paper>
          {/** First Name */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">First Name</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('firstname')}
                onBlur={handleInputBlur}
                onChange={(e) => handleProfileChange('firstname', e.target.value)}
                value={profileInfo.firstname}
                readOnly={editableField !== 'firstname'}
              />
            </Box>
          </Box>

          {/** Last Name */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">Last Name</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('lastname')}
                onBlur={handleInputBlur}
                onChange={(e) => handleProfileChange('lastname', e.target.value)}
                value={profileInfo.lastname}
                readOnly={editableField !== 'lastname'}
              />
            </Box>
          </Box>

          {/** Email */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">Email</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="email"
                onClick={() => handleInputClick('email')}
                onBlur={handleInputBlur}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                value={profileInfo.email}
                readOnly={editableField !== 'email'}
              />
            </Box>
          </Box>

          {/** DOB */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">DOB</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('dob')}
                onBlur={handleInputBlur}
                onChange={(e) => handleProfileChange('dob', e.target.value)}
                value={profileInfo.dob}
                readOnly={editableField !== 'dob'}
              />
            </Box>
          </Box>

          {/** Phone */}
          <Box className="flex md:space-x-4 p-2">
            <Box component="div" sx={{}} className="w-32">Phone</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('phone')}
                onBlur={handleInputBlur}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                value={profileInfo.phone}
                readOnly={editableField !== 'phone'}
              />
            </Box>
          </Box>
        </Paper>

        <Paper className="mt-4">
          {/** Street */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">Street</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('street')}
                onBlur={handleInputBlur}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                value={address.street}
                readOnly={editableField !== 'street'}
              />
            </Box>
          </Box>

          {/** City */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">City</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('city')}
                onBlur={handleInputBlur}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                value={address.city}
                readOnly={editableField !== 'city'}
              />
            </Box>
          </Box>

          {/** State/Region */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">State/Region</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('state')}
                onBlur={handleInputBlur}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                value={address.state}
                readOnly={editableField !== 'state'}
              />
            </Box>
          </Box>

          {/** Postal Code */}
          <Box className="flex md:space-x-4 border-solid border-0 border-b border-gray-400 p-2">
            <Box component="div" sx={{}} className="w-32">Postal Code</Box>
            <Box component="div" sx={{}} className="grow text-align-left">
              <input
                type="text"
                onClick={() => handleInputClick('zip')}
                onBlur={handleInputBlur}
                onChange={(e) => handleAddressChange('zip', e.target.value)}
                value={address.zip}
                readOnly={editableField !== 'zip'}
              />
            </Box>
          </Box>

          {/** Country */}
          <Box className="flex md:space-x-4 p-2">
            <Box component="div" sx={{}} className="w-32">Country</Box>
            <Box component="div" sx={{}} className="grow text-align-left relative">
              {editableField !== 'country' && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleInputClick('country')}
                />
              )}
              <select
                onBlur={handleInputBlur} // Disable the select list on blur
                onChange={(e) => handleAddressChange('country', e.target.value)}
              >
                <option value="">Select Country</option>
                {countryList.map((country) => (
                  <option
                    key={country.code2}
                    value={country.code2}
                    selected={country.code2 === address.country} // If country matches address, it's selected
                  >
                    {country.code2}
                  </option>
                ))}
              </select>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserProfile;
