'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Children, ReactNode, useContext, useEffect, useState } from 'react';
import styles from '@/components/knowledgeCheck/index.module.scss';
//import { KCContext, useKnowledgeCheckContext } from '@/components/knowledgeCheck';
import { QuizContext, useQuizContext } from '@/components/quiz';
import { Button, Typography } from '@mui/material';
import { useNodePageContext } from '@/components/nodePage';
import { CompletedLesson } from '@/types';
import { useSession } from 'next-auth/react';
import PostCompletionData from './postCompletionData';
import PatchCompletionData from './patchCompletionData';


interface quizSliderProps {
  children: ReactNode;
}



const QuizSliderPageContext: React.FC<quizSliderProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children);
  const quizContext = useQuizContext();
  const nodePageContext = useNodePageContext();
  const { data: session, status } = useSession();
  const [field_score, setField_score] = useState(0);
  const [title, setTitle] = useState("");
  const [completedLesson, setCompletedLesson] = useState<CompletedLesson>({
    type: [{ target_id : "completed_lessons"}],
    title: [],
    field_lesson_ref: [],
    field_pass: [],
    field_score: [],
    field_subject_ref: [],
  });
  useEffect(() => {
    console.log(nodePageContext);
    quizContext.setTotalCount(arrayChildren.length);
    const field_lesson_ref: number = Number(nodePageContext.field_lesson_ref);
    
    setCompletedLesson((prev) => ({
      ...prev, // Spread operator to retain existing properties
      field_lesson_ref: [{ target_id: field_lesson_ref }], 
      field_subject_ref: [{ target_id: nodePageContext.field_subject_ref }]
    }));

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${month}-${day}-${year}`;
    const user_id = session?.user?.userId;
    
  
    setTitle(`${currentDate}_${user_id}_${nodePageContext.field_subject_ref}_${field_lesson_ref}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(title !== "") {
      setCompletedLesson((prev) => ({
        ...prev, // Spread operator to retain existing properties
        title: [{ value: title }]
      }));
    }
    //console.log("quizContext***********", quizContext);
    if((quizContext.totalCount > 0) && (quizContext.displayItem === quizContext.totalCount)) {
      setField_score(Math.round(quizContext.totalScore / quizContext.totalCount * 100));
      setCompletedLesson((prev) => ({
        ...prev, // Spread operator to retain existing properties
        field_score: [{ value: Math.round(quizContext.totalScore / quizContext.totalCount * 100) }],
        field_pass: [{ value: quizContext.totalScore / quizContext.totalCount * 100 >= 80 ? true : false }],
      })); 
    } 

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizContext]);

  // Monitor changes to `completedLesson`
  useEffect(() => {
    if(completedLesson.field_pass.length > 0) {
      if((quizContext.totalCount > 0) && (quizContext.displayItem === quizContext.totalCount)) { 
        if(nodePageContext.nodeLessonCompletion.length === 0){
          console.log(completedLesson);
        
          const postCompletionDataResponse = PostCompletionData(completedLesson);
          postCompletionDataResponse.then((data) => {
            nodePageContext.setNodeLessonCompletion([{
              field_lesson_ref: data.field_lesson_ref[0].target_id.toString(),
              field_score: data.field_score[0].value.toString(),
              field_pass: data.field_pass[0].value ? "On" : "Off",
              nid: data.nid[0].value.toString()
            }]
            );
          }); 
        } else {
         
         if (field_score > Number(nodePageContext.nodeLessonCompletion[0].field_score)) {
          const PatchCompletionDataResponse = PatchCompletionData(nodePageContext.nodeLessonCompletion[0].nid, completedLesson);
          PatchCompletionDataResponse.then((data) => {
            console.log("PatchCompletionDataResponse***", data);
            nodePageContext.setNodeLessonCompletion((prevCompletion) =>
              prevCompletion.map((lesson, index) =>
                index === 0
                  ? {
                      ...lesson,
                      field_score: field_score.toString(),
                      field_pass: completedLesson.field_pass[0].value ? "On" : "Off",
                    }
                  : lesson
              )
            );
          }); 
         } 
        }
      }
    }
  }, [completedLesson]);

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    quizContext.setDisplayItem(0);
    quizContext.setTotalScore(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Typography>{`${quizContext.displayItem}/${quizContext.totalCount}`}</Typography>
      </Box>
      {quizContext.displayItem === quizContext.totalCount ? (
        <React.Fragment>
          {field_score >= 80 ?
            <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
              {`Congratulations, you passed ${field_score}%. 
            This lesson is mark completed.`}
            </Typography> :
            <React.Fragment>
            <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
              {`Sorry, you failed ${field_score}%. 
                You can click the Reset button to try again.`}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
              <Button variant="kcbutton" onClick={handleReset}>Reset</Button>
          </Box>
          </React.Fragment>
          }
        </React.Fragment>
      ) : (
        Children.map(arrayChildren, (child: ReactNode, index) => {
          if (React.isValidElement(child)) {
            if (quizContext.displayItem === index) {
              return child;
            }
          }
        })
      )
      }
    </Box>
  );
}

export default QuizSliderPageContext;
