

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, codePlayerProps } from '@/components/codemirror/codePlayer';



const CodeIframe: React.FC<codePlayerProps> = ({html, javascript, css}) => {
    const { htmlCode, cssCode, javascriptCode} = useContext(CodePlayerContext);
    const [srcDoc, setSrcDoc] = useState(``);
    const [htmlToIframe, setHtmlToIframe] = useState(html);
    const [cssToIframe, setCssToIframe] = useState(css);
    const [javascriptToIframe, setJavascriptToIframe] = useState(javascript);

    useEffect(() => {
        htmlCode && setHtmlToIframe(htmlCode)
        cssCode && setCssToIframe(cssCode)
        javascriptCode && setJavascriptToIframe(javascriptCode)
 
        const timeOut = setTimeout(() => {
            
            setSrcDoc(
              `
                <html>
                <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js"></script>
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
