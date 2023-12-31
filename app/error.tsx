'use client' // Error components must be Client Components
 
import { DashboardAlert } from '@/components/dashboardAlert';
import CenterBox from '@/components/layouts/centerBox';
import Main from '@/components/main';
import { Button } from '@mui/material';
import { useEffect } from 'react'
 
export default function Error({error, reset }: {error: Error; reset: () => void;}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message)
  }, [error])
 
  return (
    <Main>
        <CenterBox>
            <DashboardAlert title={error.name} severity='error' alertMessage={error.message} />
            <Button sx={{ maxWidth:'300px', margin: '10px auto'}} variant="contained" onClick={() => reset()}>Try Again</Button>
        </CenterBox>
    </Main>
  )
}
