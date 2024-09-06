
import LayoutContainer from '@/components/layouts/layoutContainer';
import { Height } from '@mui/icons-material';
import { Box } from '@mui/material';
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'test',
    description: 'test',
  }

interface FullPageLayoutProps {
    children: React.ReactNode;
}
  
const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
    return (
      <LayoutContainer>
          {children}
      </LayoutContainer>
      )
};
export default FullPageLayout;