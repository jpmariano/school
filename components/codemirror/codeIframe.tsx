

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, Editor, codePlayerProps} from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
import scss from '@hai2007/algorithm/scss.js';

interface codeIframeProps extends codePlayerProps {
  title: string;
}
const CodeIframe: React.FC<codeIframeProps> = ({title, head, editors}) => {
  //console.log(head)
  //console.log(editors)
    const { htmlCode, cssCode, javascriptCode, headCode, sassCode} = useContext(CodePlayerContext);
    
    const [srcDoc, setSrcDoc] = useState(``);
    const [headToIframe, setHeadToIframe] = useState('');
    const [htmlToIframe, setHtmlToIframe] = useState('');
    const [cssToIframe, setCssToIframe] = useState('');
    const [sassToIframe, setSassToIframe] = useState('');
    const [javascriptToIframe, setJavascriptToIframe] = useState('');
    const { height, width } = useWindowDimensions();
    const containerHeight = (height/1.67).toString() + 'px';
    useEffect(() => {
      
      //scss(sassCode);


      let newHead = '';
      head && 
        head.map((item: String, i: number) => {
          newHead += item;
        });
        setHeadToIframe(newHead);
      editors &&
        editors.map((item: Editor, i: number) => {
        item.language === 'html' && setHtmlToIframe(item.code);
        item.language === 'css' && setCssToIframe(item.code);
        item.language === 'javascript' && setJavascriptToIframe(item.code);
        item.language === 'sass' && setSassToIframe(item.code);
      });
       
      
       }, [editors, head]);

    useEffect(() => {
 
        htmlCode && setHtmlToIframe(htmlCode);
        cssCode && setCssToIframe(cssCode);
        javascriptCode && setJavascriptToIframe(javascriptCode);
        sassCode && setSassToIframe(sassCode);
        let newHeadCode = '';
        headCode && headCode.map((item: String, i: number) => { newHeadCode += item; }); setHeadToIframe(newHeadCode);
        const timeOut = setTimeout(() => {
        
            setSrcDoc(
              `
                <html>
                <head>
                ${headToIframe}
         
                <script src="https://cdn.jsdelivr.net/npm/browser-scss@1.0.3/dist/browser-scss.min.js"></script>

                </head> 
                  <body>${htmlToIframe}</body>
                  <style type="text/css">${cssToIframe}</style>
                  <script>${javascriptToIframe}</script>
                  <style type="text/scss">${sassToIframe}</style>
                
                </html>
              `
            )
          }, 250);
          return () => clearTimeout(timeOut);

       }, [cssCode, cssToIframe, headCode, headToIframe, htmlCode, htmlToIframe, javascriptCode, javascriptToIframe, sassCode, sassToIframe]);
      
  return (
    <Paper component="section" sx={{ height: containerHeight }}>
         <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          min-height={containerHeight}
          height="100%"
        />
    </Paper> 
    );
};

export default CodeIframe;
