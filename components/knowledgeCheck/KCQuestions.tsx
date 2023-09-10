
import React from 'react';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCForm from '@/components/knowledgeCheck/KCForm';




export interface kCQuestionsProps {
    questions: RadioQuestion[];
}

const KCQuestions: React.FC<kCQuestionsProps> = ({ questions }) => {
    return (
        questions.map((item: RadioQuestion, i: number) => {
            return (
                <KCForm key={i.toString()} question={item.question} answers={item.answers} />
            )
        })

    )

};

export default KCQuestions;
