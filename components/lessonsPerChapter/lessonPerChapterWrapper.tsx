

import React, { Suspense, useEffect, useState } from 'react';

import {  lessonid, listOfLessons, paragraphProps } from '@/types';
import LessonsPerChapter from '.';


export interface lessonPerChapterWrapperProps  {
    chapters: string[];
    listOfLessons: listOfLessons;
    listofCompletedLessonsbySubject: lessonid[];
  }


const LessonPerChapterWrapper: React.FC<lessonPerChapterWrapperProps> = ({  chapters, listOfLessons, listofCompletedLessonsbySubject}): React.ReactNode | null=> {
  
  
    return (
        <LessonsPerChapter chapters={chapters} listOfLessons={listOfLessons} listofCompletedLessonsbySubject={listofCompletedLessonsbySubject} />
    );
    

};

export default LessonPerChapterWrapper;
