
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import { Included, paragraphProps, Body, FieldImage, IncludeItem } from '@/types';
import { BASE_URL } from '@/api/config';


//const backgroundImageFileUrl = backgroundImageFile.attributes.uri.url;
//src={`${DOMAIN}${backgroundImageFileUrl}`}

const ParaImage: React.FC<paragraphProps> = ({key, data, index, included}) => {
  const imageId: Included | null  = 'field_image' in data.relationships ?  included.filter(obj => {
    return obj.id == data.relationships.field_image.data.id
  }) : null;

  return (
    imageId ? (
      <Box key={key} component="div" className='para-image'>
        <Image
          objectFit='cover'
          src={`${BASE_URL}${imageId[0].attributes.uri.url}`}
          alt={data.relationships.field_image.data.meta.alt}
          width={data.relationships.field_image.data.meta.width}
          height={data.relationships.field_image.data.meta.height}
        /> 
    </Box>
     ) : null
 );

};

export default ParaImage;
