
'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import MuiTabs from '@/components/tabs';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodeIframe from '@/components/codemirror/codeIframe';
import SmartColumns from '@/components/layouts/smartColumns';


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
    htmlAnswer?: string;
    javascript?: string;
    javascriptAnswer?: string;
    css?: string;
    cssAnswer?: string;
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

const CodePlayer: React.FC<codePlayerProps> = ({html, javascript, css, htmlAnswer, cssAnswer, javascriptAnswer}) => {
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
          <MuiTabs>
            { html && 
              <Box component="div" sx={{ width: 1 }} title="HTML">
                <CodeEditor language='html' answer={htmlAnswer}>{htmlCode}</CodeEditor>
              </Box>
            }
            { css && 
              <Box component="div" sx={{ width: 1 }} title="CSS">
                <CodeEditor language='css' answer={cssAnswer}>{cssCode}</CodeEditor>
              </Box>
            }
            { javascript && 
              <Box component="div" sx={{ width: 1 }} title="JAVASCRIPT">
                <CodeEditor language='javascript' answer={javascriptAnswer}>{javascriptCode}</CodeEditor>
              </Box>
            }
          </MuiTabs>
          
        ) : (
          <SmartColumns>
            { html && 
              <MuiTabs>
                <Box component="div" sx={{ width: 1 }} title="HTML">
                  <CodeEditor language='html' answer={htmlAnswer}>{htmlCode}</CodeEditor>
                </Box>
              </MuiTabs>
            }
            { css && 
              <MuiTabs>
                <Box component="div" sx={{ width: 1 }} title="CSS">
                  <CodeEditor language='css' answer={cssAnswer}>{cssCode}</CodeEditor>
                </Box>
              </MuiTabs>
            }
            { javascript && 
              <MuiTabs>
                <Box component="div" sx={{ width: 1 }} title="JAVASCRIPT">
                  <CodeEditor language='javascript'  answer={javascriptAnswer}>{javascriptCode}</CodeEditor>
                </Box>
              </MuiTabs>
            }
          </SmartColumns>
          
        )
      }
    <CodeIframe html={html} css={css} javascript={javascript}></CodeIframe>
    </CodePlayerContext.Provider>
  );
};

export default CodePlayer;
