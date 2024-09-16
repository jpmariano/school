

import React, { useEffect, useState } from 'react';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCForm from '@/components/knowledgeCheck/KCForm';
import { AnswersObj, paragraphProps, RadioQuestionUnformatted } from '@/types';




export interface kCQuestionsProps {
    questions: RadioQuestion[];
}

const KCQuestioners: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode | null=> {

    const questions = data.attributes.field_kcquestions?.map((item: RadioQuestionUnformatted, i: number) => {
        return (
            <KCForm 
                key={i.toString()} 
                question={item.question} 
                answers={JSON.parse(item.answers)} 
            />
        );
    }) || null; // Return null if there are no questions

    return (
        <>{questions}</> // Use a React Fragment to return the list of KCForm components
    );
    

};

export default KCQuestioners;
