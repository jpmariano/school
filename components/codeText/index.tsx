
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import CodeReadOnly from '@/components/codemirror/codeReadonly';
import codeJsx from '@/data/code_jsx.json';

export interface contentImageProps {
  value: string;
}

const CodeText: React.FC = () => {
//const BodyContent = (value: string) => {

  return (
    <Box component="div" className="md:flex">
        <Box component="div" className="image-container p-5 md:w-auto lg:shrink-0">
            <CodeReadOnly language="javascript">{codeJsx[0].editors[0].code as string}</CodeReadOnly>
        </Box>
        <Box component="div" className="text-container p-10 md:flex-grow w-full">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Box>
    </Box>
  )
};

export default CodeText;
