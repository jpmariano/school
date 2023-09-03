
'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Box } from '@mui/material';

export type TermTypeID = {
    id: number;
    term: string;
    definition: string;
}

type SortableContextType = {
  originalTerms: TermTypeID[];
  setOriginalTerms: React.Dispatch<React.SetStateAction<TermTypeID[]>>;
  randomizeTerms: TermTypeID[];
  setRandomizeTerms: React.Dispatch<React.SetStateAction<TermTypeID[]>>;
}


interface SortableProps {
  children: ReactNode;
}



export const SortableContext = createContext<null | SortableContextType> (null);

//Context Children Wrapper
export const SortableProvider: React.FC<SortableProps> = ({children}) => {
    const [originalTerms, setOriginalTerms] = useState<TermTypeID[]>([]);
    const [randomizeTerms, setRandomizeTerms] = useState<TermTypeID[]>([]);

  return (
    <SortableContext.Provider value={{ originalTerms, setOriginalTerms, randomizeTerms, setRandomizeTerms }}>
      {children}
    </SortableContext.Provider>
    );
};  

//Use by Children
export const useSortableContext = () => {
  const sortableContext = useContext(SortableContext);
  if(!sortableContext) throw new Error("You need to use this context inside the SortableProvider");
  return (sortableContext);
}; 


