

import React, { Suspense, useEffect, useState } from 'react';

import { CircleProps, Editor, ImageProps, Included, paragraphProps, RadioQuestionUnformatted } from '@/types';
import { BASE_URL } from '@/api/config';
import ContentImage from '.';




const ContentImageWrapper: React.FC<paragraphProps> = ({ data, index, included }): React.ReactNode | null => {


    const circle: CircleProps = JSON.parse(data.attributes.field_circle);

    const imageFile: Included | null = 'field_image' in data.relationships ? included.filter(obj => {
        return obj.id == data.relationships.field_image.data.id
    }) : null;

    let image: ImageProps = {
        url: imageFile ? `${BASE_URL}${imageFile[0].attributes.uri.url}` : '',
        alt: data.relationships.field_image.data.meta.alt,
        width: data.relationships.field_image.data.meta.width,
        height: data.relationships.field_image.data.meta.height
    };

    return (
        <ContentImage title={data.attributes.field_title} body={data.attributes.field_text.value} image={image} circle={circle} isImageRight={data.attributes.field_is_image_right} />
    );


};

export default ContentImageWrapper;
