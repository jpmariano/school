
import React, { useContext } from 'react';
import { Data, Included, Links, node, NodeType, Parent, TaxonomyPage } from '@/types';
import ParaText from "@/components/paraText";
import ParaImage from '@/components/paraImage';
import HorizontalSeparator from '@/components/layouts/horizontalSeparator';
import SortableTerms from '@/components/sortable/SortableTerms';
import { SortableProvider } from '@/components/sortable';
import { KnowledgeCheckProvider } from '../knowledgeCheck';
import KCStepper from '@/components/knowledgeCheck/KCStepper';
import KCQuestioners from '@/components/knowledgeCheck/KCQuestioners';
import CodePlayerWrapper from '@/components/codemirror/codePlayerWrapper';
import QuizWrapper from '@/components/quiz/QuizWrapper';
import ContentImageWrapper from '@/components/contentImage/contentImageWrapper';
import CodeTextWrapper from '@/components/codeText/codeTextWrapper';
import ExamWrapper from '@/components/quiz/ExamWrapper';

export interface taxonomyPageSlicesProps {
    data: TaxonomyPage;
}



const TaxonomyPageSlices: React.FC <taxonomyPageSlicesProps> = ({data})=> {


	return (
    <div className='paragraphs'>
      {data.included.map(function (item, i) {
       console.log("item.type ******************************", item.type);
        switch (item.type) {
          case 'paragraph--paragraph_text':
            return (
              <React.Fragment key={i}>
                <ParaText
                  data={item}
                  index={i}
                  included={data.included} />
                  <HorizontalSeparator />
              </React.Fragment>
            );
            case 'paragraph--paragraph_image':
              return (
                <React.Fragment key={i}>
                  <ParaImage
                    data={item}
                    index={i}
                    included={data.included} />
                    <HorizontalSeparator />
                </React.Fragment>
              );
            case 'paragraph--paragraph_sortable':
              return (
                <React.Fragment key={i}>
                <SortableProvider>
                  <SortableTerms
                  data={item}
                  index={i}
                  included={data.included} />
                  </SortableProvider>
                 <HorizontalSeparator />
                 </React.Fragment>
              );
            case 'paragraph--paragraph_kcquestions':
              return (
                <React.Fragment key={i}>
                  <KnowledgeCheckProvider>
                    <KCStepper>
                      <KCQuestioners data={item} index={i} included={data.included} /> 
                    </KCStepper>
                  </KnowledgeCheckProvider>
                  <HorizontalSeparator />
                </React.Fragment>
              );
            case 'paragraph--paragraph_code':
              return (
                <React.Fragment key={i}>
                  <CodePlayerWrapper data={item} index={i} included={data.included} /> 
                  <HorizontalSeparator />
                </React.Fragment>
              );  
            case 'paragraph--paragraph_multiple_choice':
              return (
                <React.Fragment key={i}>
                  <ExamWrapper data={item} index={i} included={data.included} /> 
                  <HorizontalSeparator />
                </React.Fragment>
              ); 
            case 'paragraph--paragraph_content_image':
                return (
                  <React.Fragment key={i}>
                    <ContentImageWrapper data={item} index={i} included={data.included} /> 
                    <HorizontalSeparator />
                  </React.Fragment>
                );
            case 'paragraph--paragraph_code_text':
              return (
                <React.Fragment key={i}>
                  <CodeTextWrapper data={item} index={i} included={data.included} /> 
                  <HorizontalSeparator />
                </React.Fragment>
              );  
          default:
            return null;
        }
      })}
    </div>
  );
};

export default TaxonomyPageSlices;
