

interface FullPageLayoutProps {
    children: React.ReactNode;
    isHeader?: boolean;
}

import styles from "@/styles/components/layouts/layoutcontainer.module.scss";
import { Box } from "@mui/material";

const LayoutContainer: React.FC<FullPageLayoutProps> = ({ isHeader = false, children }) => {
 
    return (
        <Box id="fullpage" component="section" className={isHeader ? styles.layout : ''}>
          {children}
        </Box>
      )
};
export default LayoutContainer;