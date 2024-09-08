
'use client'
import React, { ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import MuiTabs from '@/components/tabs';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodeIframe from '@/components/codemirror/codeIframe';
import SmartColumns from '@/components/layouts/smartColumns';
import ProjectSettings from '@/components/codemirror/projectSettings';
import ScssToCssDisplay from '@/components/codemirror/scssToCssDisplay';
import { Editor } from '@/types';




export interface contextProps {
    headCode?: String[];
    upDateHead?: (head: String[]) => void;
    footerCode?: String[];
    upDateFooter?: (footer: String[]) => void;
    htmlCode?: string;
    upDateHtml?: (html: string) => void;
    javascriptCode?: string;
    updateJavascript?: (javascript: string) => void;
    cssCode?: string;
    updateCss?: (css: string) => void;
    sassCode?: string;
    updateSass?: (sass: string) => void;
    lessCode?: string;
    updateLess?: (less: string) => void;
    initialized?: Boolean;
    updateInitialized?: (init: SetStateAction<boolean>) => void;
}

export interface codePlayerProps {
    head: String [];
    footer: String [];
    editors: Editor [];
}

const defaultState = {
  headCode: [],
  upDateHead: (head: String[]) => console.log(head),
  htmlCode: '',
  upDateHtml: (html: string) => console.log(html),
  javascriptCode: '',
  updateJavascript: (javascript: string) => console.log(javascript),
  cssCode: '',
  updateCss: (css: string) => console.log(css),
  lessCode: '',
  updateLess: (less: string) => console.log(less),
  sassCode: '',
  updateSass: (sass: string) => console.log(sass),
  initialized: false,
  updateInitialized: (init: SetStateAction<boolean>) => console.log(init),
};

export const CodePlayerContext = createContext<Partial<contextProps>>(defaultState);

const CodePlayer: React.FC<codePlayerProps> = ({editors, head, footer}) => {
    const [htmlCode, setHtmlCode] = useState('');
    const [javascriptCode, setJavascriptCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [sassCode, setSassCode] = useState('');
    const [lessCode, setLessCode] = useState('');
    const [initialized, setInitialized] = useState(false);
    const [headCode, setHeadCode] = useState<String[]>([]);
    const [footerCode, setFooterCode] = useState<String[]>([]);
    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.down('lg'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const upDateHtml = (htmlCodex: string) => {
    setHtmlCode(htmlCodex);
  };

  const updateJavascript = (javascriptCodex: string) => {
    setJavascriptCode(javascriptCodex);
  };

  const updateCss = (cssCodex: string) => {
    setCssCode(cssCodex);
  };

  const updateLess = (lessCodex: string) => {
    setLessCode(lessCodex);
  };

  const updateSass = (sassCodex: string) => {
    setSassCode(sassCodex);
  };


  const updateInitialized = (initCode: SetStateAction<boolean>) => {
    setInitialized(initCode);
  };

  const upDateHead = (headCodex: String[]) => {
    setHeadCode(headCodex);
  };

  const upDateFooter = (footerCodex: String[]) => {
    setFooterCode(footerCodex);
  };

  useEffect(() => {
    editors &&
      editors.map((item: Editor, i: number) => {
      item.language === 'html' && setHtmlCode(item.code);
      item.language === 'css' && setCssCode(item.code);
      item.language === 'javascript' && setJavascriptCode(item.code);
      item.language === 'sass' && setSassCode(item.code);
      item.language === 'less' && setLessCode(item.code);
    })
    head && setHeadCode([...head]);
    updateInitialized(true);

   }, [editors, head]);
  


  return (
    <CodePlayerContext.Provider value={{ htmlCode, upDateHtml, javascriptCode, updateJavascript, cssCode, updateCss, headCode, upDateHead, footerCode, upDateFooter, sassCode, updateSass, lessCode, updateLess, initialized, updateInitialized }}>
      {!(!cssCode && !lessCode && !javascriptCode && !sassCode && headCode?.length && footerCode?.length === 0) &&  <ProjectSettings head={head} footer={footer}/>}
      <MuiTabs>
        {editors &&
          editors.map((item: Editor, i: number) => {
            switch (item.language) {
              case "sass": {
                return (
                  <Box key={i} component="div" sx={{ width: 1 }} title="SCSS">
                    <CodeEditor editable={item.enable === '1' ? true : false} language={item.language} answer={item?.answer}>{item.code}</CodeEditor>
                  </Box>
                );
                break;
              }
              case "javascript": {
                return (
                  <Box key={i} component="div" sx={{ width: 1 }} title={isMd ? 'JS' : item.language.toUpperCase()}>
                    <CodeEditor editable={item.enable === '1' ? true : false} language={item.language} answer={item?.answer}>{item.code}</CodeEditor>
                  </Box>
                );
                break;
              }
              default: {
                return (
                  <Box key={i} component="div" sx={{ width: 1 }} title={item.language.toUpperCase()}>
                    <CodeEditor editable={item.enable === '1' ? true : false} language={item.language} answer={item?.answer}>{item.code}</CodeEditor>
                  </Box>
                );
                break;
              }
            }
          })}
        {editors &&
          editors.map((item: Editor, i: number) => {
            switch (item.language) {
              case "sass": {
                return (<Box key={`${i}-sass`} component="div" sx={{ width: 1 }} title="CSS">
                  <ScssToCssDisplay language={item.language}>{item.code}</ScssToCssDisplay>
                </Box>);
                break;
              }
              case "less": {
                return (<Box key={`${i}-less`} component="div" sx={{ width: 1 }} title="CSS">
                  <ScssToCssDisplay language={item.language}>{item.code}</ScssToCssDisplay>
                </Box>);
                break;
              }
              default: {
                break;
              }
            }
          })}
          {htmlCode && <CodeIframe head={head} footer={footer} editors={editors} title="Results"></CodeIframe>}
        
      </MuiTabs>
    </CodePlayerContext.Provider>
  );
};

export default CodePlayer;
