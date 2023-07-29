
import { GetServerSideProps, NextPage } from 'next';
import { Typography, useTheme } from '@mui/material';
import Main from '@/components/main';
import CenterBox from '@/components/layouts/centerBox';
import FullWidthBox from '@/components/layouts/fullWidth';
import HorizontalSeparator from '@/components/layouts/horizontalSeparator';
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar';
import Aside from '@/components/layouts/aside';
import NotAside from '@/components/layouts/notAside';
import ShowCode from '@/components/prismjs/showcode';
import SuperEditor from '@/components/prismjs/superEditor';
import jscode from '@/data/js.json';
//import { useEffect } from 'react';


const Index: NextPage = () => {
  
 // const theme = useTheme();
 
  
  return (
    <Main>
      <HorizontalSeparator />
      <CenterBox>
      <SuperEditor codeValue={jscode[0].code} />
      </CenterBox>
      <HorizontalSeparator />
      <CenterBox>
      <ShowCode>
      {jscode[0].code}
      </ShowCode>
        </CenterBox>
      <HorizontalSeparator />
      <CenterBoxWithSidebar fullwidth={false} mobileReverseOrder={true}>
        <NotAside addClassName="inverse">item 2</NotAside>
        <Aside addClassName="inverse">item 1</Aside>
      </CenterBoxWithSidebar>
      <HorizontalSeparator />
      <CenterBoxWithSidebar fullwidth={false}>
        <Aside addClassName="inverse">item 1</Aside>
        <NotAside addClassName="inverse">item 2</NotAside>
      </CenterBoxWithSidebar>
      <HorizontalSeparator />
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside addClassName="inverse">item 1</Aside>
        <NotAside addClassName="inverse">item 2</NotAside>
      </CenterBoxWithSidebar>
      <HorizontalSeparator />
      <CenterBoxWithSidebar >
        <Aside addClassName="inverse">item 1</Aside>
        <NotAside addClassName="inverse">item 2</NotAside>
      </CenterBoxWithSidebar>
      <HorizontalSeparator />
      <CenterBox>
        <Typography component="h1" variant="h1">H1</Typography>
        <Typography component="h2" variant="h2">H2</Typography>
        <Typography component="h3" variant="h3">H3</Typography>
        <Typography component="h4" variant="h4">H4</Typography>
        <Typography component="p" variant="body1">Body1</Typography>
        <Typography component="p" variant="body2">Body2</Typography>
        <Typography component="p" variant="subtitle1">Subtitle1</Typography>
        <Typography component="p" variant="overline">Overline</Typography>
      </CenterBox>
      <HorizontalSeparator />
      <CenterBox>
        <Typography component="h1" variant="h1">test</Typography>
        <Typography component="h2" variant="h2">test</Typography>
        <Typography component="h3" variant="h3">test</Typography>
        <Typography component="h4" variant="h4">test</Typography>
        <Typography component="p" variant="body1">test</Typography>
        <Typography component="p" variant="body2">test</Typography>
        <Typography component="p" variant="subtitle1">test</Typography>
        <Typography component="p" variant="overline">test</Typography>
      </CenterBox>
      <HorizontalSeparator />
      <FullWidthBox>
        <Typography component="h1" variant="h1">test</Typography>
        <Typography component="h2" variant="h2">test</Typography>
        <Typography component="h3" variant="h3">test</Typography>
        <Typography component="h4" variant="h4">test</Typography>
        <Typography component="p" variant="body1">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Typography>
        <Typography component="p" variant="body2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Typography>
        <Typography component="p" variant="subtitle1">test</Typography>
        <Typography component="p" variant="overline">test</Typography>
      </FullWidthBox>
      <HorizontalSeparator top={false}/>
    </Main>
  );
};

export default Index;