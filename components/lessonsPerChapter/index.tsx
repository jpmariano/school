
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import {lesson, lessonid, listOfLessons, node_lesson} from '@/types';
import { Box, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle';
import styles from '@/components/lessonsPerChapter/index.module.scss';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

export interface lessonsPerChapterProps {
  chapters: string[];
  listOfLessons: listOfLessons;
  listofCompletedLessonsbySubject?: lessonid[];
}

const LessonsPerChapter: React.FC<lessonsPerChapterProps> = ({chapters, listOfLessons, listofCompletedLessonsbySubject}) => {

const getCompletion = (lessonid: lessonid[], nid: string): lessonid | null => {
  //let completedLesson = lessonid.some( el => el.field_lesson_ref === nid);
  const result = lessonid.find(item => item.field_lesson_ref === nid);
  if(result){
    return result;
  } else {
    return null;
  }

};
//const LessonsPerChapter = (chapters: string[], listOfLessons: listOfLessons) => {
  return (
    chapters.map((eachChapter: string, index: number) => {
        return (
          <List key={index}>
            <ListItem><ListItemText primary={eachChapter} sx={{position:"absolute", top: 0}}/>
              <Box className={`grid grid-cols-1 lg:grid-cols-2`} sx={{ mt: 3}}>
                {listOfLessons.map((item: lesson, index1: number) => {
                  if (item.field_subject_of_lesson === eachChapter) {
                    let completed = false;
                    return (
                        <Box key={index1} sx={{display: 'flex', flexDirection: 'column', minWidth: '250px', mt: 1}}> 
                            <Box component='span'>
                              <Link href={item.view_node} >{item.title}</Link>
                         
                              {listofCompletedLessonsbySubject ? 
                                getCompletion(listofCompletedLessonsbySubject, item.nid) ? 
                                  getCompletion(listofCompletedLessonsbySubject, item.nid)?.field_pass === "On"  ? 
                                    <Tooltip title="Lesson Quiz Passed">
                                      <CircleIcon sx={{color: 'green', verticalAlign: 'top',  marginLeft: 2}}/>
                                    </Tooltip>: 
                                    <Tooltip title="Re-Take Lesson Quiz">
                                      <CircleIcon sx={{color: 'red', verticalAlign: 'top',  marginLeft: 2}}/>
                                    </Tooltip>
                                    
                                  :
                                  <Tooltip title="Lesson Quiz Not Taken">
                                    <CircleIcon sx={{color: 'gray', verticalAlign: 'top',  marginLeft: 2}}/>
                                  </Tooltip>
                                :
                                <Tooltip title="Lesson Quiz Not Taken">
                                    <CircleIcon sx={{color: 'gray', verticalAlign: 'top',  marginLeft: 2}}/>
                                </Tooltip>}
                            </Box>
                            {listofCompletedLessonsbySubject && listofCompletedLessonsbySubject.map((el, index) =>  {
                                if (el.field_lesson_ref === item.nid){
                                  return<Box component="span" key={index.toString()}>Score: {el.field_score}</Box>
                                } 
                              })}
                   
                          
                         
                        </Box>
                    );
                  }
                })}
              </Box>
              </ListItem>
          </List>
        );
      })
    );
};

export default LessonsPerChapter;
