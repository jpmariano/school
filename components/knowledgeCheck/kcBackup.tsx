
import React from 'react';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCForm from '@/components/knowledgeCheck/KCForm';
import { AnswersObj, paragraphProps, RadioQuestionUnformatted } from '@/types';




export interface kCQuestionsProps {
    questions: RadioQuestion[];
}

const kcBackup: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode => {

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
    //let questions:RadioQuestion = [];
    /*
    const questions:RadioQuestion[] = data.attributes.field_kcquestions ? data.attributes.field_kcquestions.map((item: RadioQuestionUnformatted) => {
        let parsedAnswer: RadioQuestion = {
            question: '',
            answers: [{
                answer: '',
                value: ''
            }]
        };
        //console.log('question', item.question);
        //console.log('answers', item.answers);
         parsedAnswer.question = item.question;
        parsedAnswer.answers = JSON.parse(JSON.parse(item.answers));
        return parsedAnswer;
    }) : []; */
    
    
    //console.log(questions);
    //return null;
    
    //const questions = data.relationships.field_paragraph_qa_k.data.
    /*
    return (
        
        questions.map((item: RadioQuestion, i: number) => {
            //console.log(item);
            return (
                <KCForm key={i.toString()} question={item.question} answers={item.answers} />
            )
        })

    ) */

};

export default kcBackup;
