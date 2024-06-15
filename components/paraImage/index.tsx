
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import { Included, paragraphProps, Body, FieldImage, IncludeItem } from '@/types';
import { BASE_URL } from '@/api/config';
import styles from "@/styles/components/paraImage/paraimage.module.scss";

//const backgroundImageFileUrl = backgroundImageFile.attributes.uri.url;
//src={`${DOMAIN}${backgroundImageFileUrl}`}

const ParaImage: React.FC<paragraphProps> = ({ data, index, included}) => {

  const imageFile: Included | null  = 'field_image' in data.relationships ?  included.filter(obj => {
    return obj.id == data.relationships.field_image.data.id
  }) : null;

  const paragraph_image: Included  =  included.filter(obj => {
    return obj.type == "paragraph--paragraph_image"
  }); 
  
  return (
    imageFile ? (
      <Box key={index.toString()} component="div" className='para-image'>
        <Image
          src={`${BASE_URL}${imageFile[0].attributes.uri.url}`}
          alt={data.relationships.field_image.data.meta.alt}
          width={data.relationships.field_image.data.meta.width}
          height={data.relationships.field_image.data.meta.height}
          style={{objectFit: paragraph_image[0].attributes.field_image_styles}}
          className={styles.paraimage}
        /> 
    </Box>
     ) : null
 );

};

export default ParaImage;
