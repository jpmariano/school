
import LayoutContainer from '@/components/layouts/layoutContainer';
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'HTML',
    description: 'HTML Lesson',
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