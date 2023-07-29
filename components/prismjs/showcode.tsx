
'use client'
import React, { ReactNode, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import styles from "@/styles/components/prismjs/showcode.module.scss";
import Prism from 'prismjs';
//import 'prismjs/themes/prism.css';
//import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism-okaidia.css';
//import 'prismjs/themes/prism-twilight.css';

export interface notAsideProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html';
}

const ShowCode: React.FC<notAsideProps> = ({children, language = 'javascript'}) => {
    useEffect(() => {
        Prism.highlightAll();
        }, []);
  return (
        <pre><code className={`language-${language} ${styles.code}`}>{children}</code></pre>
    );
};

export default ShowCode;