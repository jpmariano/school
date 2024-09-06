
import React from 'react';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCForm from '@/components/knowledgeCheck/KCForm';
import { AnswersObj, paragraphProps, RadioQuestionUnformatted } from '@/types';
import knowledgeCheckJson from '@/data/knowledgeCheck.json';



export interface kCQuestionsProps {
    questions: RadioQuestion[];
}

const kcbackups: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode => {
    //let questions:RadioQuestion = [];
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
    }) : [];
    
    //const fromSampleData = knowledgeCheckJson as RadioQuestion[];
    
    //console.log(questions);
    //return null;
    
    //const questions = data.relationships.field_paragraph_qa_k.data.
    return (
        
        questions.map((item: RadioQuestion, i: number) => {
            //console.log(item);
            return (
                <KCForm key={i.toString()} question={item.question} answers={item.answers} />
            )
        })

    ) 

};

export default kcbackups;
