
'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { CompletedCourseNode, lessonid } from '@/types';


type TaxonomyCourseContextType = {
  field_subject_ref: string;
  completedCourseNode: CompletedCourseNode[] | [];
  setCompletedCourseNode: React.Dispatch<React.SetStateAction<CompletedCourseNode[] | []>>;
}


interface taxonomyCourseProps {
  children: ReactNode;
  field_subject_ref: string;
  initialCompletedCourseNode: CompletedCourseNode[] | [];
}



export const TaxonomyCoursePageContext = createContext<null | TaxonomyCourseContextType> (null);

//Context Children Wrapper
export const TaxonomyCoursePageProvider: React.FC<taxonomyCourseProps> = ({field_subject_ref, initialCompletedCourseNode, children}) => {
    //const [field_lesson_ref, setField_lesson_ref] = useState("");
    //const [field_subject_ref, setField_subject_ref] = useState(0);
    const [completedCourseNode, setCompletedCourseNode] = useState<CompletedCourseNode[] | []>(initialCompletedCourseNode);

   
    
  return (
    <TaxonomyCoursePageContext.Provider value={{  field_subject_ref,  completedCourseNode, setCompletedCourseNode }}>
      {children}
    </TaxonomyCoursePageContext.Provider>
    );
};  

//Use by Children
export const useTaxonomyCoursePageContext = () => {
  const taxonomyCoursePageContext = useContext(TaxonomyCoursePageContext);
  if(!taxonomyCoursePageContext) throw new Error("You need to use this context inside the TaxonomyCoursePageProvider");
  return (taxonomyCoursePageContext);
}; 


