
'use client'
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
import { Data, Included, RevisionUidOrUidOrFieldSubjectOfLesson } from '@/types';
import ParaText from "@/components/paraText";
import ParaImage from '@/components/paraImage';

export interface slicesProps {
    data: Data;
    included: Included;
    nodetype: string | null;
}



const Slices: React.FC <slicesProps> = ({data, included = [], nodetype = null})=> {
 // const { isMobile } = useContext(IsMobileContext);
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));




	
  //console.log(nodetype);


	return (
    <div className='paragraphs'>
      {included.map(function (item, i) {

        switch (item.type) {
          case 'paragraph--paragraph_text':
            return (
              <ParaText
                key={i.toString()}
                data={item}
                index={i}
                included={included}
              />
            );
            case 'paragraph--paragraph_image':
              return (
                <ParaImage
                  key={i.toString()}
                  data={item}
                  index={i}
                  included={included}
                />
              );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Slices;
