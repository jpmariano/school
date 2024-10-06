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
import { useTaxonomyCoursePageContext } from '@/components/taxonomyPage';
import { useSession } from 'next-auth/react';
import { CompletedCourse, CompletedCourseNode } from '@/types';
import { generateRandomAlphaNumeric } from '@/utils/generateRandomAlphaNumeric';
import { PatchCompletedCourse, PostCompletedCourse } from './completedCourse';



interface quizSliderProps {
  children: ReactNode;
}



const ExamSliderPageContext: React.FC<quizSliderProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children);
  const quizContext = useQuizContext();
  const taxonomyCoursePageContext = useTaxonomyCoursePageContext();
  const { data: session, status } = useSession();
  const [field_score, setField_score] = useState(0);
  const [title, setTitle] = useState("");
  const [field_certificate_id, setField_certificate_id] = useState("");
  const [completedCourse, setCompletedCourse] = useState<CompletedCourse>({
    type: [{ target_id : "completed_courses"}],
    title: [],
    field_pass: [],
    field_score: [],
    field_subject_ref: [],
    field_certificate_id: [],
  });
  useEffect(() => {
    console.log(taxonomyCoursePageContext);
    quizContext.setTotalCount(arrayChildren.length);
    const field_subject_ref: number = Number(taxonomyCoursePageContext.field_subject_ref);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${month}${day}${year}`;
    const user_id = session?.user?.userId;
    setCompletedCourse((prev) => ({
      ...prev, // Spread operator to retain existing properties
      field_subject_ref: [{ target_id: field_subject_ref }],
    }));
    setTitle(`${currentDate}_${user_id}_${taxonomyCoursePageContext.field_subject_ref}`);
    const randomAlphaNumeric = generateRandomAlphaNumeric(30);
    setField_certificate_id(`${currentDate}${user_id}${taxonomyCoursePageContext.field_subject_ref}${randomAlphaNumeric}`);
    //10-7-2024_3_1
    //html106202431
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(title !== "") {
      setCompletedCourse((prev) => ({
        ...prev, // Spread operator to retain existing properties
        title: [{ value: title }],
      }));
    }
    
    //console.log("quizContext***********", quizContext);
    if((quizContext.totalCount > 0) && (quizContext.displayItem === quizContext.totalCount)) {
      setField_score(Math.round(quizContext.totalScore / quizContext.totalCount * 100));
      setCompletedCourse((prev) => ({
        ...prev, // Spread operator to retain existing properties
        field_score: [{ value: Math.round(quizContext.totalScore / quizContext.totalCount * 100) }],
        field_pass: [{ value: quizContext.totalScore / quizContext.totalCount * 100 >= 80 ? true : false }],
      })); 
      quizContext.totalScore / quizContext.totalCount * 100 >= 80 && setCompletedCourse((prev) => ({
        ...prev, // Spread operator to retain existing properties
        field_certificate_id: [{ value: field_certificate_id }]
      })); 
    } 

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizContext]);

  // Monitor changes to `completedCourse`
  useEffect(() => {
    if(completedCourse.field_pass.length > 0) {
      if((quizContext.totalCount > 0) && (quizContext.displayItem === quizContext.totalCount)) { 
        if(taxonomyCoursePageContext.completedCourseNode.length === 0){
          console.log(completedCourse);
        
          const postCompletedCourseResponse = PostCompletedCourse(completedCourse);
          postCompletedCourseResponse.then((data) => {
            taxonomyCoursePageContext.setCompletedCourseNode(prevState => [...prevState, data]);
          }); 
        } else {
         
         if (field_score > Number(taxonomyCoursePageContext.completedCourseNode[0].field_score[0].value)) {
          const patchCompletedCourseResponse = PatchCompletedCourse(taxonomyCoursePageContext.completedCourseNode[0].nid.toString(), completedCourse);
          patchCompletedCourseResponse.then((data) => {
            console.log("PatchCompletionDataResponse***", data);
            taxonomyCoursePageContext.setCompletedCourseNode(prevState => [...prevState, data]);
          }); 
         } 
        }
      }
    }
  }, [completedCourse]);

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
          {quizContext.totalScore / quizContext.totalCount * 100 >= 80 ?
            <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
              {`Congratulations, you passed ${quizContext.totalScore / quizContext.totalCount * 100}%. 
            This lesson is mark completed.`}
            </Typography> :
            <React.Fragment>
            <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
              {`Sorry, you failed ${quizContext.totalScore / quizContext.totalCount * 100}%. 
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

export default ExamSliderPageContext;
