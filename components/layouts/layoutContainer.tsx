

interface FullPageLayoutProps {
    children: React.ReactNode;
}

import styles from "@/styles/components/layouts/layoutcontainer.module.scss";
import { Box } from "@mui/material";

const LayoutContainer: React.FC<FullPageLayoutProps> = ({ children }) => {
    return (
        <Box id="fullpage" component="section" className={styles.layout}>
          {children}
        </Box>
      )
};
export default LayoutContainer;