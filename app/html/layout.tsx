
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
        <section id="fullpage">
          {children}
        </section>
      )
};
export default FullPageLayout;