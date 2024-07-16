import React, {MouseEvent}  from "react";
import styles from "@/styles/components/loginform/buttonunderlined.module.scss";
import { Box, Button } from "@mui/material";

interface ButtonUnderlinedProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  component?: React.ElementType;
}

const ButtonUnderlined: React.FC<ButtonUnderlinedProps> = ({
  text,
  icon,
  iconPosition = 'left',
  onClick,
  component = 'button',
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
      {icon && iconPosition === 'left' && (
        <span className={styles['icon-left']}>{icon}</span>
      )}
      <Box className={styles['underline-button']}>
        <Button
          className={styles.button}
          onClick={onClick}
          component={component}
        >
          <span className={styles.text}>{text}</span>
        </Button>
      </Box>
      {icon && iconPosition === 'right' && (
        <span className={styles['icon-right']}>{icon}</span>
      )}
    </Box>
  );
};

export default ButtonUnderlined;
