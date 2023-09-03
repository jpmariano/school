
'use client'
import React, { useEffect, useState } from 'react';
import { QRadioQuestion } from '@/components/quiz/QuizForm';
import QuizForm from '@/components/quiz/QuizForm';
import {TermTypeID, useSortableContext} from '@/components/sortable';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Sortable from 'sortablejs';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import dragLight from '@/public/icons/drag-horizontal-svgrepo-com.svg';
import dragDark from '@/public/icons/drag-horizontal-svgrepo-com-dark.svg';
import Icon from '@/components/icon';


export type TermType= {
    term: string;
    definition: string;
}

export interface SortableTermsProps {
    terms: TermType[];
    id?: string;
}

const SortableTerms: React.FC<SortableTermsProps> = ({ terms, id }) => {
    const sortableContext = useSortableContext();
    const termiDs = terms.map((item: TermType, i: number) => {
        return (
            {id: i ,...item}
        );
    });
    const [randomTerms, setRandomTerms] = useState<TermTypeID[]>(termiDs.sort(() => Math.random() - 0.5));
    const [areAnswersCorrect, setAreAnswersCorrect] = useState<boolean | null>(null);
    const [disableSort, setDisableSort] = useState<boolean>(false);
    const el = document.getElementById(id ? id : 'simpleList');
    const sortable = el && Sortable.create(el, {
        handle: '.drag-move',
        animation: 150
      });
      
    
      const theme = useTheme();
      let isLight: boolean = true;
      if (theme.palette.mode === 'dark') {
          isLight = false;
      }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const children = el && el.querySelectorAll('div');
        const idArr: number[] = [];
        if(children) { 
            for (let i = 0; i < children.length; i++) {
                idArr.push(Number(children[i].getAttribute("id")));
            }
        }
        if(idArr.every(function(num, index) {
            return index === idArr.length - 1 || num < idArr[index + 1];
          })){
            setAreAnswersCorrect(true);
            //sortable?.options.disabled = true;
            // sortable && sortable.options.disabled = true;
            //sortable?.option('disabled', true);
            //setDisableSort(true);
            //const sortState = sortable && sortable.option("disabled"); // get
            //console.log(sortState)
            //sortable && sortable.option("disabled", !sortState); // set
            setDisableSort(true);
          } else {
            setAreAnswersCorrect(false);
          }
       
  
    };
    useEffect(() => {
     
        sortableContext.setOriginalTerms(termiDs);
        sortableContext.setRandomizeTerms(randomTerms);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box>
            <Box>{!areAnswersCorrect ? areAnswersCorrect !== null ? <Typography>Try Again</Typography> : <Typography>Sort Item</Typography> :  <Typography>Congratulation! You got it!</Typography> }</Box>
            <Box sx={{ display: 'flex' }}>
                <Box className='terms'>
                    {terms.map((item: TermType, i: number) => {
                        return (
                            <Box key={i.toString()}><Typography variant='body1'>{item.term}</Typography></Box>
                        );
                    })}
                </Box>
                <Box id={id ? id : 'simpleList'} className="list-group" sx={{ flexGrow: 1 }}>
                    {randomTerms.map((item: TermTypeID, i: number) => {
                        return (
                            <Box id={item.id.toString()} key={i.toString()} className='list-group-item' sx={{ display: 'flex', backgroundColor: `${isLight? 'rgba(243, 243, 243, 1)' : 'rgba(29, 44, 85, .5)'}`, marginY: 1 }}>
                                <Box component='span' className={`drag-move ${disableSort && 'hidden'}`}><Icon svg={isLight ? dragLight : dragDark} alt={'Drag Icon'} size='md' /></Box>
                                <Typography variant='body2'>{item.definition}</Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            <Box>
            <Button variant='kcbutton' disabled={areAnswersCorrect ? areAnswersCorrect : false} onClick={(e) => checkAnswer(e)}>SUBMIT</Button>
            </Box>
        </Box>
        
    )

};

export default SortableTerms;
