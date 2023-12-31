

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, Editor, codePlayerProps} from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
import * as less from 'less';

interface codeIframeProps extends codePlayerProps {
  title: string;
}
const CodeIframe: React.FC<codeIframeProps> = ({title, head, editors}) => {
  //console.log(head)
  //console.log(editors)
    const { htmlCode, cssCode, javascriptCode, headCode, sassCode, lessCode} = useContext(CodePlayerContext);
    
    const [srcDoc, setSrcDoc] = useState(``);
    const [headToIframe, setHeadToIframe] = useState('');
    const [htmlToIframe, setHtmlToIframe] = useState('');
    const [cssToIframe, setCssToIframe] = useState('');
    const [sassToIframe, setSassToIframe] = useState('');
    const [lessToIframe, setLessToIframe] = useState('');
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
        if(item.language === 'less'){
          less.render(item.code).then(function (output: any) {
            setLessToIframe(output.css);
          },
            function (error: any) {
              setLessToIframe(item.code);
            });
          //setLessToIframe(item.code);
        } 
      });
       
      
       }, [editors, head]);

    useEffect(() => {
      let lessCodeCss = '';
      lessCode && less.render(lessCode).then(function (output: any) {
        lessCodeCss = output.css;
      },
        function (error: any) {
          console.log(error);
        });
        htmlCode && setHtmlToIframe(htmlCode);
        cssCode && setCssToIframe(cssCode);
        javascriptCode && setJavascriptToIframe(javascriptCode);
        sassCode && setSassToIframe(sassCode);
        lessCode && setLessToIframe(lessCode);
        if(lessCode){
          less.render(lessCode).then(function (output: any) {
            setLessToIframe(output.css);
          },
            function (error: any) {
              setLessToIframe(lessCode);
            });
          //setLessToIframe(item.code);
        } 
        let newHeadCode = '';
        headCode && headCode.map((item: String, i: number) => { newHeadCode += item; }); setHeadToIframe(newHeadCode);

        const timeOut = setTimeout(() => {
          if((!cssCode) && (!lessCode) && (!javascriptCode) && (!sassCode) && (headCode?.length === 0)){
            htmlCode && setSrcDoc(htmlCode);
          } else {
            setSrcDoc(
              `
                <html>
                <head>
                ${headToIframe}
         
                <script src="https://cdn.jsdelivr.net/npm/browser-scss@1.0.3/dist/browser-scss.min.js"></script>

                </head> 
                  <body>
                    ${htmlToIframe}
                    <style type="text/css">${cssToIframe}</style>
                    <script>${javascriptToIframe}</script>
                    <style type="text/scss">${sassToIframe}</style>
                    <style type="text/css">${lessToIframe}</style>
                  </body>
                </html>
              `
            );
          }
            
          }, 250);
          return () => clearTimeout(timeOut);

       }, [cssCode, cssToIframe, headCode, headToIframe, lessToIframe, htmlCode, htmlToIframe, javascriptCode, javascriptToIframe, sassCode, sassToIframe, lessCode]);
      
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
