
import styles from "@/styles/components/layouts/fullPageTemplate.module.scss";
import AuthProgressWrapper from '@/components/authProgressWrapper';
interface FullPageTemplateProps {
  children: React.ReactNode;
}

const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
  return (
      <div id="FullPageTemplate" className={styles.fullPageTemplate}>{children}</div>
    )
};
export default FullPageTemplate;