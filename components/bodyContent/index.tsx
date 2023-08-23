
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';



const BodyContent = (value: string) => {
  return <Box component="div" className='body-content'>{parse(value)}</Box>
};

export default BodyContent;
