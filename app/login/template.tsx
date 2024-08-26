
import LoginPageWrapper from "@/components/authProgressWrapper/loginPageWrapper";
import styles from "@/styles/components/layouts/fullPageTemplate.module.scss";
interface FullPageTemplateProps {
  children: React.ReactNode;
}

const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
  return (
        <div id="FullPageTemplate" className={styles.fullPageTemplate}>{children}</div>
    )
};
export default FullPageTemplate;