
'use client'
import React, { useEffect } from 'react';
import { Box, Card, IconButton, Modal, Popover, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import styles from "@/styles/components/iconbtns/answerbtn.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CodeReadOnly from '@/components/codemirror/codeReadonly';

export interface answerBtnProps {
    children?: string;
    language?: 'javascript' | 'css' | 'html' | 'sass' | 'less' | 'jsx';
}

const AnswerBtn: React.FC<answerBtnProps> = ({language='javascript', children}) => {
   
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(!open)
    };
    const handleClose = () => {
        setOpen(!open)
    };

    return (
        <Box className="answer-icon-btn" title={`${language.toUpperCase()} ANSWER`}>
            <IconButton onClick={handleOpen} sx={{ color: open ? "#FCB61C" : isLight ? '#121212' : '#ffffff' }} aria-label="Solution">
                <FeedIcon fontSize="small" />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className={styles.modal}
            >
                <Card variant="outlined" className={styles.card}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography component={'h3'} variant={'body1'} sx={{flexGrow: 2, textAlign: 'center', marginTop: '4px' }}>{`${language.toUpperCase()} ANSWER`}</Typography>
                        <IconButton onClick={handleClose} sx={{ color: isLight ? '#121212' : '#ffffff' }} aria-label="Solution">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <CodeReadOnly language='javascript'>{children}</CodeReadOnly>
                </Card>
            </Modal>
        </Box>
    );
};

export default AnswerBtn;
