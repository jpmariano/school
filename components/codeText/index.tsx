
'use client'
import React, { useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box, Typography } from '@mui/material';
import CodeReadOnly from '@/components/codemirror/codeReadonly';
import codeJsx from '@/data/code_jsx.json';
import ReactVisibilitySensor from 'react-visibility-sensor';
import CenterBox from '@/components/layouts/centerBox';
import FullWidthBox from '@/components/layouts/fullWidth';

export interface codeTextProps {
  title: string;
  description?: string;
  code: string;
  language: 'javascript' | 'css' | 'html' | 'sass' | 'less' | 'jsx' | 'typescript'| 'php' | 'json' | 'sql' | 'yaml';
  isCodeRight?: boolean;
}

const CodeText: React.FC<codeTextProps> = ({title, description, code, language='javascript', isCodeRight = true}) => {
//const BodyContent = (value: string) => {
  const text = useRef<HTMLDivElement>();
  const container = useRef<HTMLDivElement>();
  const fadeDown = (isVisible: boolean) => {
		if (isVisible) {
            
            if(container.current){
                container.current.className = 'slide-down';
            }
			
		}
	};

	const slideUpText = (isVisible: boolean) => {
		if (isVisible) {
	
            if(text.current){
                text.current.className = 'slide-over';
            }

		}
	};
  return (
    <>
      <ReactVisibilitySensor partialVisibility={true} onChange={slideUpText}>
        <Box ref={text}> {title && <Typography component={'h2'} variant={'h2'} className='px-10'>{title}</Typography>}</Box>
      </ReactVisibilitySensor>
      <Box component="div" className={`flex ${isCodeRight ? 'xl:flex-row-reverse' : 'xl:flex-row'}  xs:flex-col-reverse`}>
        <ReactVisibilitySensor partialVisibility={true} onChange={fadeDown}>
          <Box ref={container}>
            <Box component="div" className="xl:w-[50rem] p-5 sm:w-auto xl:shrink-0 relative">
              <CodeReadOnly language={language}>{code as string}</CodeReadOnly>
            </Box>
          </Box>
        </ReactVisibilitySensor>
        <Box component="div" className="text-container xs:px-5 md:px-10 py-5 xl:flex-grow w-full">
          {description && <Typography component={'p'} variant={'body2'} >{parse(description)}</Typography>}
        </Box>
      </Box>
      </>
  )
};

export default CodeText;
