
import React, { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';
import MuiTabs from '@/components/tabs';
import js from '@/data/js.json';
import css from '@/data/css.json';
import html from '@/data/html.json';
import SuperEditor from '@/components/prismjs/superEditor';

export interface jsToIframeProps {
    children?: ReactNode;
    addClassName?: string | null;
}

const JsToIframe: React.FC = () => {
  return (
    <MuiTabs titles={['HTML', 'CSS', 'JS']}>
            <Box component="div" sx={{ width: 1 }}>
                <SuperEditor id="123" language='html'>{html[0].html}</SuperEditor>
            </Box>
            <Box component="div" sx={{ width: 1 }}>
               <SuperEditor id="2345" language='css'>{css[0].css}</SuperEditor>
            </Box>
            <Box component="div" sx={{ width: 1 }}>
                <SuperEditor id="6677" >{js[0].code}</SuperEditor>
            </Box>
    </MuiTabs>
    );
};

export default JsToIframe;
