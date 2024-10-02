
'use client'
import React, { useEffect, useState } from 'react';
import { lessonid } from '@/types';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Tooltip } from '@mui/material';
import { useNodePageContext } from '@/components/nodePage';
export interface lessonCompletedProps {
    nodeLessonCompletion: lessonid[];
}

const LessonCompleted: React.FC = () => {
    const nodePageContext = useNodePageContext();
    const [complete, setComplete] = useState(false);
    const [started, setStarted] = useState(false);
    
    
    useEffect(() => {
        if (nodePageContext.nodeLessonCompletion ){
            if(nodePageContext.nodeLessonCompletion.length !== 0){
                setStarted(true);
                if(nodePageContext.nodeLessonCompletion[0].field_pass === 'On'){
                    setComplete(true);
                } 
            } 
        }
        console.log("nodePageContext", nodePageContext);
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodePageContext]);
    
  return (
       <Box component='span'>
        {started
        ? complete ? <Tooltip title="Lesson Completed"><CircleIcon sx={{color: 'green', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip> : 
            <Tooltip title="Re-Take Lesson Quiz"><CircleIcon sx={{color: 'red', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip>
        : <Tooltip title="Take and Pass Lesson Quiz"><CircleIcon sx={{color: 'gray', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip>
      }
       </Box>
    )
};

export default LessonCompleted;
