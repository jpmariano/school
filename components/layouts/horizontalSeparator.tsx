
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import styles from "@/styles/components/layouts/horizontalseparator.module.scss";

export interface HorizontalSeparatorProps {
    top?: Boolean;
}

const HorizontalSeparator: React.FC<HorizontalSeparatorProps> = ({top = true}) => {
  return (
    <Divider className={top ? styles.dividerTop : styles.dividerBottom} />
    );
};

export default HorizontalSeparator;
