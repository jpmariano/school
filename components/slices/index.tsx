
import React, { useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import Logo from "@/components/logo";
import { IsMobileContext } from '@/components/provider/ismobileProvider';
import styles from "@/styles/components/headernav/index.module.scss";
import { usePathname } from 'next/navigation';
import navItems from '@/data/mainnav.json';
import BodyContent from '@/components/bodyContent';
import { Data, Included, Links, node, NodeType, Parent, RevisionUidOrUidOrFieldSubjectOfLesson } from '@/types';
import ParaText from "@/components/paraText";
import ParaImage from '@/components/paraImage';
import HorizontalSeparator from '@/components/layouts/horizontalSeparator';
import SortableTerms from '@/components/sortable/SortableTerms';
import { SortableProvider } from '@/components/sortable';
import { KnowledgeCheckProvider } from '../knowledgeCheck';
import KCStepper from '@/components/knowledgeCheck/KCStepper';
import KCQuestions from '@/components/knowledgeCheck/KCQuestions';
import knowledgeCheckJson from '@/data/knowledgeCheck.json';
import { RadioQuestion } from '@/components/knowledgeCheck/KCForm';
import KCQuestioners from '@/components/knowledgeCheck/KCQuestioners';
import CodePlayerWrapper from '@/components/codemirror/codePlayerWrapper';
import QuizWrapper from '@/components/quiz/QuizWrapper';
import ContentImageWrapper from '@/components/contentImage/contentImageWrapper';
import CodeTextWrapper from '@/components/codeText/codeTextWrapper';

export interface slicesProps {
    data: NodeType | Parent | Links |  Data | null;
    included: Included;
    nodetype: string | null;
}



const Slices: React.FC <slicesProps> = ({data, included = [], nodetype = null})=> {
 // const { isMobile } = useContext(IsMobileContext);
  //const theme = useTheme();
  //const pathname = usePathname();
  //const isMobile = useMediaQuery(theme.breakpoints.down('lg'));


  //onsole.log('included---', included);

	
  //console.log(included);


	return (
    <div className='paragraphs'>
      {included.map(function (item, i) {
       // console.log(item.type);
        switch (item.type) {
          case 'paragraph--paragraph_text':
            return (
              <React.Fragment key={i}>
                <ParaText
                  data={item}
                  index={i}
                  included={included} />
                  <HorizontalSeparator />
              </React.Fragment>
            );
            case 'paragraph--paragraph_image':
              return (
                <React.Fragment key={i}>
                  <ParaImage
                    data={item}
                    index={i}
                    included={included} />
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
                  included={included} />
                  </SortableProvider>
                 <HorizontalSeparator />
                 </React.Fragment>
              );
            case 'paragraph--paragraph_kcquestions':
              return (
                <React.Fragment key={i}>
                  <KnowledgeCheckProvider>
                    <KCStepper>
                      <KCQuestioners data={item} index={i} included={included} /> 
                    </KCStepper>
                  </KnowledgeCheckProvider>
                  <HorizontalSeparator />
                </React.Fragment>
              );
            case 'paragraph--paragraph_code':
              return (
                <React.Fragment key={i}>
                  <CodePlayerWrapper data={item} index={i} included={included} /> 
                  <HorizontalSeparator />
                </React.Fragment>
              );  
            case 'paragraph--paragraph_multiple_choice':
              return (
                <React.Fragment key={i}>
                  <QuizWrapper data={item} index={i} included={included} /> 
                  <HorizontalSeparator />
                </React.Fragment>
              ); 
            case 'paragraph--paragraph_content_image':
                return (
                  <React.Fragment key={i}>
                    <ContentImageWrapper data={item} index={i} included={included} /> 
                    <HorizontalSeparator />
                  </React.Fragment>
                );
            case 'paragraph--paragraph_code_text':
              return (
                <React.Fragment key={i}>
                  <CodeTextWrapper data={item} index={i} included={included} /> 
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

export default Slices;
