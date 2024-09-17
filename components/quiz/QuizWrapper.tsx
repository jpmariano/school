

import React, { Suspense, useEffect, useState } from 'react';

import { Editor, MultiQuestion, paragraphProps, RadioQuestionUnformatted } from '@/types';
import { QRadioQuestion } from './QuizForm';
import { QuizProvider } from '.';
import Quizquestion from './Quizquestion';
import QuizSlider from './QuizSlider';




const QuizWrapper: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode | null=> {
    //console.log(data.attributes.field_code_footer);
    console.log('quiz', data.attributes.field_multiple_choice);
    const listOfQA: QRadioQuestion[] = data.attributes.field_multiple_choice.map((item: MultiQuestion, i: number) => {
        let answer: QRadioQuestion = new  Object() as QRadioQuestion;
        answer.question = item.multi_question;
        answer.answers = JSON.parse(item.multi_answers);
        return answer;
    });
    
    return (
        <QuizProvider>
          <QuizSlider>
            <Quizquestion questions={listOfQA} />
          </QuizSlider>
        </QuizProvider>
    );
    

};

export default QuizWrapper;
