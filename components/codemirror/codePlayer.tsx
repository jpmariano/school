
'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import MuiTabs from '@/components/tabs';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodeIframe from '@/components/codemirror/codeIframe';
import ThreeColumns from '@/components/layouts/threeColumns';


export interface contextProps {
    htmlCode?: string;
    upDateHtml?: (html: string) => void;
    javascriptCode?: string;
    updateJavascript?: (javascript: string) => void;
    cssCode?: string;
    updateCss?: (css: string) => void;
}

export interface codePlayerProps {
    html?: string;
    javascript?: string;
    css?: string;
}

const defaultState = {
  htmlCode: '',
  upDateHtml: (html: string) => console.log(html),
  javascriptCode: '',
  updateJavascript: (javascript: string) => console.log(javascript),
  cssCode: '',
  updateCss: (css: string) => console.log(css),
};

export const CodePlayerContext = createContext<Partial<contextProps>>(defaultState);

const CodePlayer: React.FC<codePlayerProps> = ({html, javascript, css}) => {
    const [htmlCode, setHtmlCode] = useState(html);
    const [javascriptCode, setJavascriptCode] = useState(javascript);
    const [cssCode, setCssCode] = useState(css);
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  

  const upDateHtml = (htmlCodex: string) => {
    setHtmlCode(htmlCodex);
  };

  const updateJavascript = (javascriptCodex: string) => {
    setJavascriptCode(javascriptCodex);
  };

  const updateCss = (cssCodex: string) => {
    setCssCode(cssCodex);
  };

 


  return (
    <CodePlayerContext.Provider value={{ htmlCode, upDateHtml, javascriptCode, updateJavascript, cssCode, updateCss }}>
      {
        isLg ? (
          <MuiTabs titles={['HTML', 'CSS', 'JS']}>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='html'>{htmlCode}</CodeEditor>
            </Box>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='css'>{cssCode}</CodeEditor>
            </Box>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='javascript'>{javascriptCode}</CodeEditor>
            </Box>
          </MuiTabs>
          
        ) : (
          <ThreeColumns>
            <MuiTabs titles={['HTML']}>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='html'>{htmlCode}</CodeEditor>
            </Box>
          </MuiTabs>
          <MuiTabs titles={['CSS']}>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='css'>{cssCode}</CodeEditor>
            </Box>
            </MuiTabs><MuiTabs titles={['JS']}>
            <Box component="div" sx={{ width: 1 }}>
              <CodeEditor language='javascript'>{javascriptCode}</CodeEditor>
            </Box>
            </MuiTabs>
          </ThreeColumns>
          
        )
      }
    <CodeIframe html={html} css={css} javascript={javascript}></CodeIframe>
    </CodePlayerContext.Provider>
  );
};

export default CodePlayer;
