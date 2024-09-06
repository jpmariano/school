'use client'
import React, { MouseEvent } from 'react';
import {
  Box,
  Container,
  IconButton,
  Button,
  Modal,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import styles from '@/styles/components/loginform/jkacknowledgementModal.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import ButtonUnderlined from '@/components/loginForm/ButtonUnderlined';

interface JKAcknowledgementModalProps {
  closeModal: (event: MouseEvent<HTMLButtonElement>) => void;
  openModal: boolean;
  modalTitle?: string;
  modalContent?: React.ReactNode;
  buttonLabel?: string;
  buttonAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  linkLabel?: string;
  linkAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  buttonComponent?: React.ElementType;
  linkComponent?: React.ElementType;
}

const JKAcknowledgementModal: React.FC<JKAcknowledgementModalProps> = ({
  closeModal,
  openModal,
  modalTitle = '',
  modalContent = null,
  buttonLabel = '',
  buttonAction = () => {},
  linkLabel = '',
  linkAction = () => {},
  buttonComponent = 'button',
  linkComponent = 'button',
}) => {
  return (
    <Modal open={openModal} onClose={closeModal} className={styles.modal}>
      <Container component="div" className={styles.modalContainer}>
        <Box className={styles.closeButtonBox}>
          <IconButton className={styles.closeButton} onClick={closeModal}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
        <Box className={styles.modalTitleBox}>
          <Typography
            className={styles.modalTitle}
            variant="h3"
            component="div"
          >
            {modalTitle}
          </Typography>
        </Box>
        {modalContent && <Box sx={{  width: '100%' }}>{modalContent}</Box>}
        {buttonLabel && (
          <>
            <Divider light className={styles.divider} />
            <Stack spacing={3} className={styles.buttonStack}>
              <Box className={styles.buttonBox}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={buttonAction}
                  component={buttonComponent}
                >
                  <Typography variant="button" color="white">
                    {buttonLabel}
                  </Typography>
                </Button>
              </Box>
              {linkLabel && (
                <Box className={styles.linkBox}>
                  <ButtonUnderlined
                    component={linkComponent}
                    onClick={linkAction}
                    text={linkLabel}
                  />
                </Box>
              )}
            </Stack>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default JKAcknowledgementModal;
