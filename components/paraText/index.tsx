
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import { Included, paragraphProps, Body } from '@/types';





const ParaText: React.FC<paragraphProps> = ({key, data, index, included}) => {
  return <Box key={key} component="div" className='body-content'>
    {parse(data.attributes.field_text.value)}
  </Box>
};

export default ParaText;
