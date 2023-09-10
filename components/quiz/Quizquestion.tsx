
import React from 'react';
import { QRadioQuestion } from '@/components/quiz/QuizForm';
import QuizForm from '@/components/quiz/QuizForm';




export interface quizProps {
    questions: QRadioQuestion[];
}

const Quizquestion: React.FC<quizProps> = ({ questions }) => {
    return (
        questions.map((item: QRadioQuestion, i: number) => {
            return (
                <QuizForm key={i.toString()} question={item.question} answers={item.answers} />
            )
        })

    )

};

export default Quizquestion;
