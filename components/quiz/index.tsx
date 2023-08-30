
'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Box } from '@mui/material';


type QuizContextType = {
  displayItem: number;
  setDisplayItem: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
}


interface QuizProps {
  children: ReactNode;
}



export const QuizContext = createContext<null | QuizContextType> (null);

//Context Children Wrapper
export const QuizProvider: React.FC<QuizProps> = ({children}) => {
    const [displayItem, setDisplayItem] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
  return (
    <QuizContext.Provider value={{ displayItem, setDisplayItem, totalCount, setTotalCount, totalScore, setTotalScore }}>
      {children}
    </QuizContext.Provider>
    );
};  

//Use by Children
export const useQuizContext = () => {
  const quizContext = useContext(QuizContext);
  if(!quizContext) throw new Error("You need to use this context inside the QuizProvider");
  return (quizContext);
}; 


