
import styles from "@/styles/components/layouts/fullPageTemplate.module.scss";
import { Box } from "@mui/material";
interface FullPageTemplateProps {
    children: React.ReactNode;
  }
  
  const FullPageTemplate: React.FC<FullPageTemplateProps> = ({ children }) => {
    return (
        <Box component="div" id="FullPageTemplate" className={styles.fullPageTemplate}>{children}</Box>
      )
  };
  export default FullPageTemplate;