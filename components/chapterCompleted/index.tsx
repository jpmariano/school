
'use client'
import React, { useEffect, useState } from 'react';
import { listOfLessons, lessonid } from '@/types';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Tooltip } from '@mui/material';
export interface chapterCompletedProps {
    listOfLessons: listOfLessons;
    listofCompletedLessonsbySubject?: lessonid[];
}

const ChapterCompleted: React.FC<chapterCompletedProps> = ({listOfLessons, listofCompletedLessonsbySubject}) => {
    const [complete, setComplete] = useState(false);
    const [started, setStarted] = useState(false);
    console.log(listofCompletedLessonsbySubject)
    useEffect(() => {
        if(listofCompletedLessonsbySubject?.length !== 0){
            setStarted(true);
            if(listOfLessons.length === listofCompletedLessonsbySubject?.length){
                const itemComplete = listofCompletedLessonsbySubject?.findIndex(item => item.field_pass === 'Off');
                if(itemComplete !== 0){
                    setComplete(true);
                }
            }
        }
         
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  return (
       <Box component='span'>
        {started
        ? complete ? <Tooltip title="All Lessons Completed"><CircleIcon sx={{color: 'green', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip> :
          <Tooltip title="Take and Pass all Lesson Quiz"><CircleIcon sx={{color: '#FCB61C', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip>
        : <Tooltip title="Take and Pass all Lesson Quiz"><CircleIcon sx={{color: 'gray', verticalAlign: 'initial',  marginLeft: 2, display: 'inline-block'}}/></Tooltip>
      }
       </Box>
    )
};

export default ChapterCompleted;
