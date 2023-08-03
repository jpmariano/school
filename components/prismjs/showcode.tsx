
'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import styles from "@/styles/components/prismjs/showcode.module.scss";
import Prism from 'prismjs';
//import 'prismjs/themes/prism.css';
//import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism-okaidia.css';
//import 'prismjs/themes/prism-twilight.css';

export interface showCodeProps {
    children?: string;
    language?: 'javascript' | 'css' | 'markup' | 'scss' | 'sass';
    id: string;
}

const ShowCode: React.FC<showCodeProps> = ({id, children, language = 'javascript'}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const lineNumbers = document.querySelector(`.linenumbers${id}`);
    const [childCode, setChildCode] = useState('');
    useEffect(() => {
        children && setChildCode(children);
        Prism.highlightAll();
        setIsLoaded(true);
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (isLoaded) {
            const countNumberofLines = children?.split('\n').length;
            //console.log(countNumberofLines)
            if (lineNumbers !== null) {
                lineNumbers.innerHTML = Array(countNumberofLines).fill('<span></span>').join('');
            }
        }
        // eslint-disable-next-line
    }, [isLoaded]);
  return (
        <Box component="div" className={`${styles.showcode}`}>
            <Box component="div" className={`linenumbers${id} ${styles.linenumbers}`}>
                <Box component="span"></Box>
            </Box>
            <pre className={styles.precontainer}><code className={`language-${language} ${styles.code}`}>{children}</code></pre>
        </Box>
    );
};

export default ShowCode;