
'use client'
import React, { ReactNode, createContext, useState } from 'react';
import { Box, Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import JkTabs from '@/components/tabs';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodeIframe from '@/components/codemirror/codeIframe';


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
    const [htmlCode, setHtmlCode] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    const [cssCode, setCssCode] = useState("");
  

  const upDateHtml = (html: string) => {
    setHtmlCode(html);
  };

  const updateJavascript = (javascriptCode: string) => {
    setJavascriptCode(javascriptCode);
  };

  const updateCss = (cssCode: string) => {
    setCssCode(cssCode);
  };


  return (
    <CodePlayerContext.Provider value={{ htmlCode, upDateHtml, javascriptCode, updateJavascript, cssCode, updateCss }}>
      <JkTabs titles={['HTML', 'CSS', 'JS']}>
        <Box component="div" sx={{ width: 1 }}>
          <CodeEditor language='html'>{html}</CodeEditor>
        </Box>
        <Box component="div" sx={{ width: 1 }}>
          <CodeEditor language='css'>{css}</CodeEditor>
        </Box>
        <Box component="div" sx={{ width: 1 }}>
          <CodeEditor language='javascript'>{javascript}</CodeEditor>
        </Box>
      </JkTabs>
    <CodeIframe html={html} css={css} javascript={javascript}></CodeIframe>
    </CodePlayerContext.Provider>
  );
};

export default CodePlayer;
