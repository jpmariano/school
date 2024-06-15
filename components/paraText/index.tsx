
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import { Included, paragraphProps, Body } from '@/types';





const ParaText: React.FC<paragraphProps> = ({ data, index, included}) => {
  return <Box key={index.toString()} component="div" className='para-text'>
    {parse(data.attributes.field_text.value)}
  </Box>
};

export default ParaText;
