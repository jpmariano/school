
import React from 'react';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCForm from '@/components/knowledgeCheck/KCForm';
import { AnswersObj, paragraphProps, RadioQuestionUnformatted } from '@/types';




export interface kCQuestionsProps {
    questions: RadioQuestion[];
}

const KCQuestioners: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode => {

    // Mapping through field_kcquestions and returning KCForm components
    const questions = data.attributes.field_kcquestions?.map((item: RadioQuestionUnformatted, i: number) => {
        return (
            <KCForm 
                key={i.toString()} 
                question={item.question} 
                answers={JSON.parse(JSON.parse(item.answers))} 
            />
        );
    }) || null; // Return null if there are no questions

    return (
        <>{questions}</> // Use a React Fragment to return the list of KCForm components
    );


};

export default KCQuestioners;
