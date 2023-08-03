
'use client'
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Box, Paper, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { sass } from '@codemirror/lang-sass';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { CodePlayerContext } from '@/components/codemirror/codePlayer';
import AnswerBtn from '@/components/iconbtns/answerBtn';
import StackRightBtn from '@/components/layouts/stackRightBtn';
import { Height } from '@mui/icons-material';
import useWindowDimensions from '@/utils/useWindowDimensions';

export interface codeEditorProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html' | 'sass';
    editable?: boolean;
    answer?: string | null;
    settings?: boolean;
}

const CodeEditor: React.FC<codeEditorProps> = ({language = 'javascript', answer,  settings = false, editable = true, children = ''}) => {

    const { upDateHtml, updateJavascript, updateCss, updateSass,  initialized,  htmlCode, cssCode, javascriptCode, headCode, sassCode} = useContext(CodePlayerContext);

    
    const [code, setCode] = useState('');
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const codeInitialize = children?.toString();
    const [showStack, setShowStack] = useState(settings);
    const { height, width } = useWindowDimensions();
    const containerHeight = height/1.67;
    const codeMirrorHeight = height/1.67 - 35;

    useEffect(() => {
         //console.log(initialized)
        //children && setCode(codeInitialize ? codeInitialize : '');
         //setIsLoaded(true);
         if(!initialized){
            children && setCode(codeInitialize ? codeInitialize : '');
         }
         switch (language) {
            case 'javascript': {
               setExtensions([javascript({ jsx: true })]);
               initialized && javascriptCode && setCode(javascriptCode);
               break;
            }
            case 'html': {
               setExtensions([html({ matchClosingTags: true })]);
               initialized && htmlCode && setCode(htmlCode);
               break;
            }
            case 'css': {
               setExtensions([css()]);
               initialized && cssCode && setCode(cssCode);
               break;
            }
            case 'sass': {
               setExtensions([sass()]);
               initialized && sassCode && setCode(sassCode);
               break;
            }
            default: {
               javascriptCode ? setCode(javascriptCode) : children && setCode(codeInitialize ? codeInitialize : '');
               setExtensions([javascript({ jsx: true })]);
               break;
            }
         }
          answer && setShowStack(true);
          //console.log('children:', children);
          // eslint-disable-next-line
       }, []);

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        console.log('value:', value);
        switch(language) { 
            case 'javascript': { 
                updateJavascript && updateJavascript(value)
               break; 
            } 
            case 'html': { 
                upDateHtml && upDateHtml(value)
               break; 
            } 
            case 'css': { 
                updateCss && updateCss(value)
               break; 
            }
            case 'sass': { 
               updateSass && updateSass(value)
              break; 
           }
            default: { 
                updateJavascript && updateJavascript(value)
               break; 
            } 
         }
      }, [language, upDateHtml, updateCss, updateSass, updateJavascript]);

       


      

  return (
    <Box component="section" sx={{overflow: 'hidden', height: `${containerHeight}px`}}>
        
         <CodeMirror
      value={code}
      height={`${codeMirrorHeight}px`}
      width='100%'
      extensions={extensions}
      onChange={onChange}
      theme='dark'
      editable={editable}
    />
     {showStack && <StackRightBtn> {answer && <AnswerBtn language={language}>{answer}</AnswerBtn>}</StackRightBtn>}
    </Box> 
    );
};

export default CodeEditor;
