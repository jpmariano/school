

'use client'
import React, { ReactNode, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodePlayer, { Editor } from '@/components/codemirror/codePlayer';
import ReactVisibilitySensor from 'react-visibility-sensor';
import CodeReadOnly from '@/components/codemirror/codeReadonly';
//import styles from "@/styles/components/layouts/aside.module.scss";

export interface CodeExplanationProps {
    title?: string | null;
    description?: string | null;
    children?: string;
}

const CodeExplanation: React.FC<CodeExplanationProps> = ({title, description, children}) => {
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
    <Paper component="section" >
        <ReactVisibilitySensor partialVisibility={true} onChange={slideUpText}>
            <Box ref={text}>
                {title && <Typography  component={'h2'} variant={'h2'} >{title}</Typography>}
                {description && <Typography component={'p'} variant={'body2'} >{description}</Typography> }         
            </Box>
        </ReactVisibilitySensor>
        <ReactVisibilitySensor partialVisibility={true} onChange={fadeDown}>
            <Box ref={container}><CodeReadOnly language={'javascript'}>{children}</CodeReadOnly></Box>
        </ReactVisibilitySensor>
         
      
        
              
    </Paper> 
    );
};

export default CodeExplanation;