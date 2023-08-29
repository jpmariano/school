
'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Box } from '@mui/material';


type KCContextType = {
  displayItem: number;
  setDisplayItem: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}


interface KnowledgeCheckProps {
  children: ReactNode;
}



export const KCContext = createContext<null | KCContextType> (null);

//Context Children Wrapper
export const KnowledgeCheckProvider: React.FC<KnowledgeCheckProps> = ({children}) => {
    const [displayItem, setDisplayItem] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
  return (
    <KCContext.Provider value={{ displayItem, setDisplayItem, totalCount, setTotalCount }}>
      {children}
    </KCContext.Provider>
    );
};  

//Use by Children
export const useKnowledgeCheckContext = () => {
  const kCContext = useContext(KCContext);
  if(!kCContext) throw new Error("You need to use this context inside the provider");
  return (kCContext);
}; 


