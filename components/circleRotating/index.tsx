"use client"
import styles from '@/styles/components/circle/circle.module.scss';
import classNames from "classnames"
import { useMediaQuery, useTheme } from '@mui/material';


export interface cicleProps {
  direction: string;
  diameter: string;
  diameter_max_width: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color?: string;
}

const CircleRotating: React.FC<cicleProps> = ({direction, diameter, diameter_max_width, top, left, right, bottom, color}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
 


    let spinDirection = `circle-${direction}`

    const circleStyles = () =>{

      if(matches){
        return {
          width: diameter_max_width,
          height: diameter_max_width,
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          border: `2px dotted ${color}`
        }
      }else{
        return {
          width: diameter,
          height: diameter,
          top: top,
          left: left,
          right: right,
          bottom: bottom,
          border: `2px dotted ${color}`
        }
      }
    }

  return (
    <div style={circleStyles()} className={classNames(styles[spinDirection])}></div>
  );
}

export default CircleRotating;