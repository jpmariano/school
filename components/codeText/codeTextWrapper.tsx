

import React, { Suspense, useEffect, useState } from 'react';

import { CircleProps, Editor, ImageProps, Included, paragraphProps, RadioQuestionUnformatted } from '@/types';
import { BASE_URL } from '@/api/config';
import ContentImage from '.';
import CodeText from '.';




const codeTextWrapper: React.FC<paragraphProps> = ({ data, index, included }): React.ReactNode | null => {


    return (
        <CodeText title={data.attributes.field_title} language={data.attributes.field_language} description={data.attributes.field_text.value} code={data.attributes.field_code}  isCodeRight={data.attributes.field_iscoderight}/>
    );


};

export default codeTextWrapper;
