

import React, { Suspense, useEffect, useState } from 'react';

import { Editor, MultiQuestion, node, paragraphProps, RadioQuestionUnformatted } from '@/types';
import { QRadioQuestion } from './QuizForm';
import { QuizProvider } from '.';
import Quizquestion from './Quizquestion';
import QuizSlider from './QuizSlider';
import QuizSliderPageContext from './QuizSliderPageContext';




const QuizWrapper: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode | null=> {
  
  
    //console.log("parent_id field_lesson_ref *****", data.attributes.parent_id);
    
   // console.log("field_subject_ref *****", node?.data?.relationships?.field_subject_of_lesson?.data?.meta?.drupal_internal__target_id);

   // console.log('quiz', data.attributes.field_multiple_choice);
    const listOfQA: QRadioQuestion[] = data.attributes.field_multiple_choice.map((item: MultiQuestion, i: number) => {
        let answer: QRadioQuestion = new  Object() as QRadioQuestion;
        answer.question = item.multi_question;
        answer.answers = JSON.parse(item.multi_answers);
        return answer;
    });
    
    return (
        <QuizProvider>
          <QuizSliderPageContext>
            <Quizquestion questions={listOfQA} />
          </QuizSliderPageContext>
        </QuizProvider>
    );
    

};

export default QuizWrapper;
