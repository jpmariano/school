
'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Box } from "@mui/material";
export interface notAsideProps {
    children?: string;
    language?: 'js' | 'css' | 'html';
    id: string;
}
//https://www.npmjs.com/package/@uiw/react-textarea-code-editor
const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    { ssr: false }
  );

  
const SuperEditor: React.FC<notAsideProps> = ({id, children, language = 'js'}) => {
  const [code, setCode] = React.useState('');
  const textarea = document.querySelector('textarea');
  const lineNumbers = document.querySelector(`.line-numbers${id}`);
  const codeInitialize = children?.toString();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    children && setCode(codeInitialize ? codeInitialize : '');
    setIsLoaded(true);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isLoaded) {
      const countNumberofLines = code?.split('\n').length;
      if (lineNumbers !== null) {
        lineNumbers.innerHTML = Array(countNumberofLines).fill('<span></span>').join('')
      }
    }
    // eslint-disable-next-line
  }, [isLoaded]);
  return (
    <Box component="div" className="supereditor">
      <Box component="div" className={`line-numbers line-numbers${id}`}>
        <Box component="span"></Box>
      </Box>
      <CodeEditor
        value={code}
        language={language}
        placeholder="Please enter JS code."
        //onChange={(evn) => setCode(evn.target.value)}
        onChange={(event) => {
          setCode(event.target.value)
          const numberOfLines = event.target.value.split('\n').length;
          if (lineNumbers !== null) {
            lineNumbers.innerHTML = Array(numberOfLines).fill('<span></span>').join('')
          }

        }}
        //padding={15}
        data-color-mode="light"
        style={{
          padding: 0
        }} />
    </Box>
    );
};

export default SuperEditor;