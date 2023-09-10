'use client'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useQuizContext } from '@/components/quiz';
import styles from "@/styles/components/knowledgecheck/knowledgecheck.module.scss";

export type QRadioQuestion = {
    question: string;
    answers: {
        answer: string;
        value: string;
    }[];
};

const QuizForm: React.FC<QRadioQuestion> = ({ question, answers }) => {
    const quizContext = useQuizContext();
    const [value, setValue] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const questionFormRef = useRef<HTMLFormElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    useEffect(() => {
        {
            answers.map((item: { answer: string; value: string; }, i: number) => {
                if (item.value === "1") {
                    setCorrectAnswer(i.toString());
                }
            })
        }
  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


   

    const nextItem = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        if(value !== ''){
            quizContext.setDisplayItem(i + 1);
        }
        
        if(value === correctAnswer){
            quizContext.setTotalScore(quizContext.totalScore + 1);
        }
    };

    return (
        <Box component={'form'} ref={questionFormRef}>
            <FormControl >
                <FormLabel sx={{'&.Mui-focused': {color: 'inherit'}, '&.Mui-error': {color: 'inherit'}}}>{question}</FormLabel>
                
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    {answers.map((item: { answer: string; value: string; }, i: number) => {
                        return (
                            <FormControlLabel className={`test${i}`} key={i.toString()} value={i.toString()} control={<Radio />} label={<Typography variant="body2" >{item.answer}</Typography>} />
                        )
                    })}


                </RadioGroup>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
                {<Button variant='kcbutton' onClick={(e) => nextItem(e, quizContext.displayItem)}>SUBMIT</Button>}
            </Box>


        </Box>
    );
}

export default QuizForm;