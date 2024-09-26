"use client"
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import CodeReadOnly from '@/components/codemirror/codeReadonly';
import codeJsx from '@/data/code_jsx.json';
import CircleRotating from '@/components/circleRotating';
import { CircleProps, ImageProps } from '@/types';

export interface contentImageProps {
  title: string;
  body: string;
  image: ImageProps;
  circle: CircleProps;
  isImageRight: boolean;
}

const ContentImage: React.FC<contentImageProps> = ({title, body, image, circle, isImageRight = true}) => {
  const theme = useTheme();
  let isLight: boolean = true;
  if (theme.palette.mode === 'dark') {
      isLight = false;
  }
  
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  //<CircleRotating bottom={'0%'} right={'-5%'}  diameter={'50vw'} diameter_max_width={'200px'} direction={"clockwise"} color={ isLight ? '#1d2c55' : '#FCB61C'}/>}
  return (
    <Box component="div" className={`md:flex ${isImageRight ? 'md:flex-row-reverse' : ''}`}>
        <Box component="div" className="md:w-[32rem] p-5 sm:w-auto lg:shrink-0 relative">
          { isImageRight ? matches ? <CircleRotating bottom={circle.bottom_placement}  right={circle.left_right_placement}   diameter={circle.diameter}  diameter_max_width={circle.diameter_max_width} direction={circle.circle_direction} color={ isLight ? circle.light_mode_color : circle.dark_mode_color }/> : 
          <CircleRotating bottom={circle.bottom_placement} left={circle.left_right_placement}  diameter={circle.diameter} diameter_max_width={circle.diameter_max_width} direction={circle.circle_direction} color={ isLight ? circle.light_mode_color : circle.dark_mode_color }/>: 
          <CircleRotating bottom={circle.bottom_placement}  right={circle.left_right_placement}   diameter={circle.diameter}  diameter_max_width={circle.diameter_max_width} direction={circle.circle_direction} color={ isLight ? circle.light_mode_color : circle.dark_mode_color }/>}
        
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="fade-in-image w-full h-auto xs:max-w-xl xs:mx-auto xs:my-0 xs:block md:inline"
          />
        </Box>
        <Box component="div" className="text-container p-10 lg:flex-grow w-full">
        <Typography variant="h2" > {title} </Typography>
        <Typography variant='body1'> {parse(body)}</Typography>
        </Box>
    </Box>
  )
};

export default ContentImage;
