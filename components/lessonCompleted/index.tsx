
'use client'
import React, { useEffect, useState } from 'react';
import { lessonid } from '@/types';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Tooltip } from '@mui/material';
export interface lessonCompletedProps {
    nodeLessonCompletion: lessonid[];
}

const LessonCompleted: React.FC<lessonCompletedProps> = ({nodeLessonCompletion}) => {
    const [complete, setComplete] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if(nodeLessonCompletion.length !== 0){
            setStarted(true);
            if(nodeLessonCompletion[0].field_pass === 'On'){
                setComplete(true);
            } 
        } 
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
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
