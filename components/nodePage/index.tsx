
'use client'
import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Box } from '@mui/material';
import { lessonid } from '@/types';


type NodeContextType = {
  field_lesson_ref: string;
  field_subject_ref: number;
  nodeLessonCompletion: lessonid[] | [];
}


interface nodeProps {
  children: ReactNode;
  field_lesson_ref: string;
  field_subject_ref: number;
  nodeLessonCompletion: lessonid[] | [];
}



export const NodePageContext = createContext<null | NodeContextType> (null);

//Context Children Wrapper
export const NodePageProvider: React.FC<nodeProps> = ({field_subject_ref, field_lesson_ref, nodeLessonCompletion, children}) => {
    //const [field_lesson_ref, setField_lesson_ref] = useState("");
    //const [field_subject_ref, setField_subject_ref] = useState(0);
  return (
    <NodePageContext.Provider value={{ field_lesson_ref,  field_subject_ref, nodeLessonCompletion }}>
      {children}
    </NodePageContext.Provider>
    );
};  

//Use by Children
export const useNodePageContext = () => {
  const nodePageContext = useContext(NodePageContext);
  if(!nodePageContext) throw new Error("You need to use this context inside the NodePageProvider");
  return (nodePageContext);
}; 


