

import React, { Suspense, useEffect, useState } from 'react';

import { Editor, paragraphProps, RadioQuestionUnformatted } from '@/types';
import { CircularProgress } from '@mui/material';
import CodePlayer from './codePlayer';



const CodePlayerWrapper: React.FC<paragraphProps> = ({ data, index, included}): React.ReactNode | null=> {
    //console.log(data.attributes.field_code_footer);
    const footerCode: String[] = data.attributes.field_code_footer.map(function (val, index) {
        return val.value;
    });
 
    const headerCode: String[] = data.attributes.field_code_header.map(function (val, index) {
        return val.value;
    });

    const editors: Editor[] = data.attributes.field_code_editor.map(function (val, index) {
        const eachEditor: Editor = JSON.parse(val);
        return eachEditor;
    });

    return (
        <Suspense fallback={  <CircularProgress />}>
          <CodePlayer head={headerCode} footer={footerCode} editors={editors}/> 
        </Suspense>
    );
    

};

export default CodePlayerWrapper;
