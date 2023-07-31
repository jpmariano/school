
'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import MuiTabs from '@/components/tabs';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodeIframe from '@/components/codemirror/codeIframe';
import SmartColumns from '@/components/layouts/smartColumns';


export type Editor = {
  language: 'html' | 'css' | 'javascript';
  enable: string;
  code: string;
  answer: string | null;
};

export interface contextProps {
    htmlCode?: string;
    upDateHtml?: (html: string) => void;
    javascriptCode?: string;
    updateJavascript?: (javascript: string) => void;
    cssCode?: string;
    updateCss?: (css: string) => void;
}

export interface codePlayerProps {
    head: String [];
    editors: Editor []
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

const CodePlayer: React.FC<codePlayerProps> = ({editors, head}) => {
    const [htmlCode, setHtmlCode] = useState('');
    const [javascriptCode, setJavascriptCode] = useState('');
    const [cssCode, setCssCode] = useState('');
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

  useEffect(() => {
    {editors &&
      editors.map((item: Editor, i: number) => {
      item.language === 'html' && setHtmlCode(item.code);
      item.language === 'css' && setCssCode(item.code);
      item.language === 'javascript' && setJavascriptCode(item.code);
    })}
   }, [editors]);
  


  return (
    <CodePlayerContext.Provider value={{ htmlCode, upDateHtml, javascriptCode, updateJavascript, cssCode, updateCss }}>
      {
        isLg ? (
          <MuiTabs>
            
            {editors &&
              editors.map((item: Editor, i: number) => {
                return (<Box key={i} component="div" sx={{ width: 1 }} title={item.language.toUpperCase()}>
                      <CodeEditor editable={item.enable === '1'? true : false} language={item.language} answer={item?.answer}>{item.code}</CodeEditor>
                    </Box>)
            })}
         
          </MuiTabs>
          
        ) : (
          <SmartColumns>
            {editors &&
            
              editors.map((item: Editor, i: number) => {
                return (<MuiTabs  key={i}>
                  <Box component="div" sx={{ width: 1 }} title={item.language.toUpperCase()}>
                    <CodeEditor editable={item.enable === '1'? true : false}  language={item.language} answer={item?.answer}>{item.code}</CodeEditor>
                  </Box>
                </MuiTabs>)
             
            })}

          </SmartColumns>
          
        )
      }
    <CodeIframe head={head} editors={editors}></CodeIframe>
    </CodePlayerContext.Provider>
  );
};

export default CodePlayer;
