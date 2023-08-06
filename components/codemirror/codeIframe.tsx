

//'use client'
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { CodePlayerContext, Editor, codePlayerProps} from '@/components/codemirror/codePlayer';
import useWindowDimensions from '@/utils/useWindowDimensions';
import * as less from 'less';
//import * as sass from 'sass';
//import * as sass from 'https://jspm.dev/sass';
import * as sass from 'node-sass';
import { convertSCSStoCSS } from '@/utils/convertSCSStoCSS';

interface codeIframeProps extends codePlayerProps {
  title: string;
}

//export default async function CodeIframe({title, head, editors}: codeIframeProps) {
const  CodeIframe: React.FC<codeIframeProps> = ({title, head, editors}) => {
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
        if(item.language === 'sass'){
          /*const getCss = async () => {
            const css = await convertSCSStoCSS(item.code);
            setSassToIframe(css);
          }
          getCss(); */
          
          try {
            
            convertSCSStoCSS(item.code).then(
              function(value) { console.log(value)},
              function(error) { console.log(error)}
            ).catch(
              function(error) { console.log(error)}
            )
            /*
            const getCss = async () => {
              const css = await convertSCSStoCSS(item.code);
              
            }
            getCss(); */
            /*
            convertSCSStoCSS(item.code).then(
              function(value) { console.log(value)},
              function(error) { console.log(error)}
            );*/
            /*
            convertSCSStoCSS(item.code).then(
              function(value) { setSassToIframe(value);},
              function(error) { setSassToIframe(error);}
            );*/
            //let result = await convertSCSStoCSS(item.code); 
          } catch(err) {
            console.log(err)
          }
        } 
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
        if(sassCode){
          /*
          const getCss = async () => {
            const css = await convertSCSStoCSS(sassCode);
            setSassToIframe(css);
          }
          getCss();*/
          
          

          try {
            /*
            convertSCSStoCSS(sassCode).then(
              function(value) { console.log(value)},
              function(error) { console.log(error)}
            ); */
            /*const getCss = async () => {
              const css = await convertSCSStoCSS(sassCode);
              //setSassToIframe(css);
              console.log(css)
            }
            getCss();*/
            /*
            convertSCSStoCSS(sassCode).then(
              function(value) { setSassToIframe(value);},
              function(error) { setSassToIframe(error);}
            );*/
          } catch(err) {
            console.log(err)
          }
          
        } 
        sassCode && setSassToIframe(sassCode);
        //lessCode && setLessToIframe(lessCode);
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
                  <style type="text/css">${lessToIframe}</style>
                </html>
              `
            )
          }, 250);
          return () => clearTimeout(timeOut);

       }, [cssCode, cssToIframe, headCode, headToIframe, lessToIframe,  htmlCode, htmlToIframe, javascriptCode, javascriptToIframe, sassCode, sassToIframe]);
      
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

export default  CodeIframe;
