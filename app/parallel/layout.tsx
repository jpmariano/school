
import Main from '@/components/main';
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'HTML',
    description: 'HTML Lesson',
  }

interface FullPageLayoutProps {
    children: React.ReactNode;
    template1: React.ReactNode;
    template2: React.ReactNode;
}
  
const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children, template1, template2 }) => {
  const isLogin: boolean = true;
    return (
        <Main>
          {children}
          {isLogin ? template1 : template2}
        </Main>
      )
};
export default FullPageLayout;