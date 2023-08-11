import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/icons/icons.module.scss';
import { SxProps } from '@mui/material';

interface IconProps {
  svg: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  //sx?: SxProps;
}

const Icon: React.FC<IconProps> = ({ svg, alt, size }) => {
    switch(size) { 
        case 'sm': { 
            return <Image priority src={svg} alt={alt} className={styles.sm} />;
           break; 
        } 
        case 'md': { 
            return <Image priority src={svg} alt={alt} className={styles.md} />;
           break; 
        } 
        case 'lg': { 
            return <Image priority src={svg} alt={alt} className={styles.lg} />;
           break; 
        } 
        case 'xl': { 
            return <Image priority src={svg} alt={alt} className={styles.xl} />;
           break; 
        } 
        case 'xxl': { 
            return <Image priority src={svg} alt={alt} className={styles.xxl} />;
           break; 
        } 
        case 'xxxl': { 
            return <Image priority src={svg} alt={alt} className={styles.xxxl} />;
           break; 
        } 
        default: { 
            return <Image priority src={svg} alt={alt} className={styles.sm} />;
           break; 
        } 
     } 
  
};

export default Icon;
