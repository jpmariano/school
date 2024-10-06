
'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { lessonid } from '@/types';


type NodeContextType = {
  field_lesson_ref: string;
  field_subject_ref: number;
  nodeLessonCompletion: lessonid[] | [];
  setNodeLessonCompletion: React.Dispatch<React.SetStateAction<lessonid[] | []>>;
}


interface nodeProps {
  children: ReactNode;
  field_lesson_ref: string;
  field_subject_ref: number;
  initialnodeLessonCompletion: lessonid[] | [];
}



export const TaxonomyPageContext = createContext<null | NodeContextType> (null);

//Context Children Wrapper
export const NodePageProvider: React.FC<nodeProps> = ({field_subject_ref, field_lesson_ref, initialnodeLessonCompletion, children}) => {
    //const [field_lesson_ref, setField_lesson_ref] = useState("");
    //const [field_subject_ref, setField_subject_ref] = useState(0);
    const [nodeLessonCompletion, setNodeLessonCompletion] = useState<lessonid[] | []>(initialnodeLessonCompletion);

   
    
  return (
    <TaxonomyPageContext.Provider value={{ field_lesson_ref,  field_subject_ref, nodeLessonCompletion, setNodeLessonCompletion }}>
      {children}
    </TaxonomyPageContext.Provider>
    );
};  

//Use by Children
export const useNodePageContext = () => {
  const nodePageContext = useContext(TaxonomyPageContext);
  if(!nodePageContext) throw new Error("You need to use this context inside the NodePageProvider");
  return (nodePageContext);
}; 


