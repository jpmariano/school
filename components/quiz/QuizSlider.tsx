'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Children, ReactNode, useContext, useEffect } from 'react';
import styles from '@/components/knowledgeCheck/index.module.scss';
//import { KCContext, useKnowledgeCheckContext } from '@/components/knowledgeCheck';
import { QuizContext, useQuizContext } from '@/components/quiz';
import { Button, Typography } from '@mui/material';



interface quizSliderProps {
  children: ReactNode;
}



const QuizSlider: React.FC<quizSliderProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children);
  const quizContext = useQuizContext();

  useEffect(() => {
    quizContext.setTotalCount(arrayChildren.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default QuizSlider;
