'use client'
import CenterBox from '@/components/layouts/centerBox'
import { Modal } from '@mui/material'
import { useState } from 'react';
//import { Modal } from 'components/modal'



export default function Html() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <p>template 1</p>
      </Modal>
  )
}
/*
  return (
  
        <CenterBox>
            <p>template 1</p>
        </CenterBox>
  ) */

