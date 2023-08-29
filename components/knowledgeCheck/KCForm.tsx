'use client'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useKnowledgeCheckContext } from '@/components/knowledgeCheck';
import styles from "@/styles/components/knowledgecheck/knowledgecheck.module.scss";

export type RadioQuestion = {
    question: string;
    answers: {
        answer: string;
        value: string;
    }[];
};

const KCForm: React.FC<RadioQuestion> = ({ question, answers }) => {
    const kCContext = useKnowledgeCheckContext();
    const [value, setValue] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<null | boolean>(null);
    const [displayReset, setDisplayReset] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [displayNext, setDisplayNext] = useState(false);
    const questionFormRef = useRef<HTMLFormElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setDisableSubmit(false);
    };

    useEffect(() => {
        {
            answers.map((item: { answer: string; value: string; }, i: number) => {
                if (item.value === "1") {
                    setCorrectAnswer(i.toString());
                }
            })
        }
        console.log(kCContext)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const reset = (e: React.FormEvent) => {
        e.preventDefault();
        questionFormRef?.current?.reset();
        setValue('');
        setIsAnswerCorrect(null);
        setDisplayReset(false);
        setDisplayNext(false);
        setDisableSubmit(true);
    };

    const nextItem = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        kCContext.setDisplayItem(i + 1);
    };

    return (
        <Box component={'form'} ref={questionFormRef}>
            <FormControl error={isAnswerCorrect !== null && !isAnswerCorrect}>
                <FormLabel sx={{'&.Mui-focused': {color: 'inherit'}, '&.Mui-error': {color: 'inherit'}}}>{question}</FormLabel>
                <Box sx={{minHeight: '23px'}}>{isAnswerCorrect !== null && !isAnswerCorrect && <Typography variant='body2' sx={{color: 'error.main'}}>Try Again</Typography>}</Box>
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
            
                {displayReset ? <Button onClick={reset} variant='kcbutton'>Reset</Button> :
                    <Button variant="kcbutton" onClick={() => {
                        if (value === correctAnswer) {
                            setIsAnswerCorrect(true);
                            setDisplayNext(true);
                            setDisableSubmit(true);
                        } else {
                            setIsAnswerCorrect(false);
                            setDisplayNext(false);
                            setDisplayReset(true);
                        }

                    }}

                        
                        disabled={disableSubmit}>Submit</Button>}


                {displayNext && <Button variant='kcbutton' onClick={(e) => nextItem(e, kCContext.displayItem)}>{kCContext.totalCount - 1 > kCContext.displayItem ? 'Next' : 'Finish'}</Button>}
            </Box>


        </Box>
    );
}

export default KCForm;