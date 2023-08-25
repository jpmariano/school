
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import {lesson, listOfLessons, node_lesson} from '@/types';
import { List, ListItem, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle';


export interface lessonsPerChapterProps {
  chapters: string[];
  listOfLessons: listOfLessons;
}

const LessonsPerChapter: React.FC<lessonsPerChapterProps> = ({chapters, listOfLessons}) => {

//const LessonsPerChapter = (chapters: string[], listOfLessons: listOfLessons) => {
  return (
    chapters.map((eachChapter: string, index: number) => {
        return (
          <List key={index}>
            <ListItem><ListItemText primary={eachChapter} sx={{position:"absolute", top: 0}}/>
              <List sx={{float: 'left', marginTop: 2, maxWidth:'744px'}}>
                {listOfLessons.map((item: lesson, index1: number) => {
                  if (item.field_subject_of_lesson === eachChapter) {
                    return (
                        <ListItem key={index1} sx={{display: 'inline', width: 1, maxWidth: '320px'}}> 
                          <Link href={item.view_node}>{item.title}</Link>
                          {item.field_completed === 'On' ? <CheckCircleIcon sx={{color: 'green', verticalAlign: 'top' , marginLeft: 2}}/> : <CircleIcon sx={{color: 'gray', verticalAlign: 'top',  marginLeft: 2}}/>}
                        </ListItem>
                    );
                  }
                })}
              </List>
              </ListItem>
          </List>
        );
      })
    );
};

export default LessonsPerChapter;
