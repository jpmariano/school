
import LayoutContainer from '@/components/layouts/layoutContainer';
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Courses',
    description: 'List of Courses',
  }

interface FullPageLayoutProps {
    children: React.ReactNode;
}
  
const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
    return (
       <LayoutContainer isHeader={true}>
          {children}
        </LayoutContainer>
      )
};
export default FullPageLayout;