'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Children, ReactNode, useContext, useEffect } from 'react';
import styles from '@/components/knowledgeCheck/index.module.scss';
import { KCContext, useKnowledgeCheckContext } from '@/components/knowledgeCheck';
import { Button, Typography } from '@mui/material';



interface kCStepperProps {
  children: ReactNode;
}



const KCStepper: React.FC<kCStepperProps> = ({ children }) => {
  const arrayChildren = Children.toArray(children);
  const kCContext = useKnowledgeCheckContext();

  useEffect(() => {
    //console.log(typeof(children), children);
    kCContext.setTotalCount(arrayChildren.length);

   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    kCContext.setDisplayItem(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={kCContext.displayItem} alternativeLabel>
        {Children.map(arrayChildren, (child: ReactNode, index) => {
          const isLast = index === arrayChildren.length - 1;
          if (React.isValidElement(child)) {
            if (child.props.label) {
              return (
                <Step key={index.toString()} className={`step${index.toString()}`}>
                  <StepLabel className={`steplabel${index.toString()}`}>{child.props.label}</StepLabel>
                </Step>
              )
            } else {
              return (
                <Step key={index.toString()} className={`step${index.toString()}`}>
                  <StepLabel className={`steplabel${index.toString()} `}> <span className='hidden'>hide</span></StepLabel>
                </Step>
              )
            }

          }


        })}
      </Stepper>
      {kCContext.displayItem === kCContext.totalCount ? (
        <React.Fragment>
          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
            Congratulations, you finished the knowledge check!
            You can click the Reset button to try again or continue with the lesson.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button variant="kcbutton" onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        Children.map(arrayChildren, (child: ReactNode, index) => {
          if (React.isValidElement(child)) {
            if (kCContext.displayItem === index) {
              return child;
            }
          }
        })
      )
      }
    </Box>
  );
}

export default KCStepper;
