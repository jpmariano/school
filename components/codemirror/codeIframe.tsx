

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, Editor, codePlayerProps} from '@/components/codemirror/codePlayer';



const CodeIframe: React.FC<codePlayerProps> = ({head, editors}) => {
    const { htmlCode, cssCode, javascriptCode} = useContext(CodePlayerContext);
    const [srcDoc, setSrcDoc] = useState(``);
    const [headToIframe, setHeadToIframe] = useState('');
    const [htmlToIframe, setHtmlToIframe] = useState('');
    const [cssToIframe, setCssToIframe] = useState('');
    const [javascriptToIframe, setJavascriptToIframe] = useState('');

    useEffect(() => {
      let newHead = '';
      head && 
        head.map((item: String, i: number) => {
          //setHeadToIframe(headToIframe + item);
          newHead += item;
        });
        setHeadToIframe(newHead);
      editors &&
        editors.map((item: Editor, i: number) => {
        item.language === 'html' && setHtmlToIframe(item.code);
        item.language === 'css' && setCssToIframe(item.code);
        item.language === 'javascript' && setJavascriptToIframe(item.code);
      })
       }, [editors]);

    useEffect(() => {
 
        htmlCode && setHtmlToIframe(htmlCode)
        cssCode && setCssToIframe(cssCode)
        javascriptCode && setJavascriptToIframe(javascriptCode)
 
        const timeOut = setTimeout(() => {
            
            setSrcDoc(
              `
                <html>
                <head>
                ${headToIframe}
                </head> 
                  <body>${htmlToIframe}</body>
                  <style>${cssToIframe}</style>
                  <script>${javascriptToIframe}</script>
                </html>
              `
            )
          }, 250);
          return () => clearTimeout(timeOut);

       }, [cssCode, htmlCode, javascriptCode]);
      
  return (
    <Paper component="section" >
         <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="500px"
        />
    </Paper> 
    );
};

export default CodeIframe;
