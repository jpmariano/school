
'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, Editor, codePlayerProps} from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
import * as less from 'less';

interface codeIframeProps extends codePlayerProps {
  title: string;
}
const CodeIframe: React.FC<codeIframeProps> = ({title, head, footer, editors}) => {
  //console.log(head)

    const { htmlCode, cssCode, javascriptCode, headCode, sassCode, lessCode, footerCode} = useContext(CodePlayerContext);
    
    const [srcDoc, setSrcDoc] = useState(``);
    const [headToIframe, setHeadToIframe] = useState('');
    const [footerToIframe, setFooterToIframe] = useState('');
    const [htmlToIframe, setHtmlToIframe] = useState('');
    const [cssToIframe, setCssToIframe] = useState('');
    const [sassToIframe, setSassToIframe] = useState('');
    const [lessToIframe, setLessToIframe] = useState('');
    const [javascriptToIframe, setJavascriptToIframe] = useState('');
    const { height, width } = useWindowDimensions();
    const containerHeight = (height/1.67).toString() + 'px';
    useEffect(() => {
      
      //scss(sassCode);
      console.log('useEffect 1');
      let newFooter = '';
      if(footer){
        footer.map((fitem: String, i: number) => {
          newFooter += fitem;
        });
        setFooterToIframe(newFooter);
      }
 
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
       
       
       }, [editors, head, footer]);

    useEffect(() => {
      console.log('useEffect 2', footerCode);
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
        if(headCode?.length === 0){
          if(head){
            head.map((headitem: String, i: number) => {
              newHeadCode += headitem;
            });
            setHeadToIframe(newHeadCode);
          }
        } else {
          headCode && headCode.map((item: String, i: number) => { newHeadCode += item; }); setHeadToIframe(newHeadCode);
        }
        
        let newFooterCode = '';
        if(footerCode?.length === 0){
          if(footer){
            footer.map((footeritem: String, i: number) => {
              newFooterCode += footeritem;
            });
            setFooterToIframe(newFooterCode);
          }
        } else {
          footerCode && footerCode.map((item: String, i: number) => { newFooterCode += item; }); setFooterToIframe(newFooterCode);
        }
        
       
        const timeOut = setTimeout(() => {
          if((!cssCode) && (!lessCode) && (!javascriptCode) && (!sassCode) && (headCode?.length === 0) && (footerCode?.length === 0)){
            htmlCode && setSrcDoc(htmlCode);
          } else {
            console.log('footerToIframe', footerToIframe);
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
                    <style type="text/scss">${sassToIframe}</style>
                    <style type="text/css">${lessToIframe}</style>
                    ${footerToIframe}
                    <script>${javascriptToIframe}</script>
                  </body>
                </html>
              `
            );
          }
            
          }, 250);
          return () => clearTimeout(timeOut);

       }, [cssCode, cssToIframe, headCode, headToIframe, footerToIframe, footerCode, lessToIframe, htmlCode, htmlToIframe, javascriptCode, javascriptToIframe, sassCode, sassToIframe, lessCode]);
      
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
