
import React, { Children, ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/smartcolumns.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
}


const SmartColumns: React.FC<cnterBoxProps> = ({children}) => {
  let count = Children.toArray(children).length;
  switch(count) { 
      case 1: { 
        return ( 
          <Paper component="section" className={styles.oneColumns}>
            {children}
          </Paper>
        )
        break; 
      }
      case 2: { 
        return ( 
          <Paper component="section" className={styles.twoColumns}>
            {children}
          </Paper>
        )
        break; 
      } 
      case 3: { 
        return ( 
          <Paper component="section" className={styles.threeColumns}>
            {children}
          </Paper>
        )
        break; 
      }
      case 4: { 
        return ( 
          <Paper component="section" className={styles.fourColumns}>
            {children}
          </Paper>
        )
        break; 
      } 
      default: { 
        
        break; 
      } 
  } 
};

export default SmartColumns;
