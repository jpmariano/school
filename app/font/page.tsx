
import { GetServerSideProps, NextPage } from 'next';
import { Typography, useTheme } from '@mui/material';
import Main from '@/components/main';
import CenterBox from '@/components/layouts/centerBox';
import FullWidthBox from '@/components/layouts/fullWidth';
import HorizontalSeparator from '@/components/layouts/horizontalSeparator';
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar';
import Aside from '@/components/layouts/aside';
import NotAside from '@/components/layouts/notAside';
import code from '@/data/code.json';
import codeJsx from '@/data/code_jsx.json';
import CodeEditor from '@/components/codemirror/codeEditor';
import CodePlayer, { Editor } from '@/components/codemirror/codePlayer';
import CodeExplanation from '@/components/codemirror/codeExplanation';
//import { useEffect } from 'react';


const Index: NextPage = () => {
  
 // const theme = useTheme();
 
  
  return (
    <Main>
      <HorizontalSeparator />
      <Typography component="h1" variant="h1">test</Typography>
      <Typography component="h2" variant="h2">test</Typography>
      <Typography component="h3" variant="h3">test</Typography>
      <Typography component="h4" variant="h4">test</Typography>
      <Typography component="p">test</Typography>
      <HorizontalSeparator top={false} />
    </Main>
  );
};

export default Index;