'use client'
import {BreadcrumbItem, Options, breadcrumbPath} from '@/types';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


interface BreadcrumbProps {
    pathname: string | null;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pathname }) => {
    const pathSegments = pathname && pathname.split("/").filter((segment) => segment !== "");
    const breadCrumbs: breadcrumbPath[] = pathSegments ? pathSegments.map((segment, index) => {
        let newPath: string = '';
      
        for (let i = 0; i <= index; i++) {
          newPath += `/${pathSegments[i]}`;
        }
      
        return {
          breadcrumb: segment.charAt(0).toUpperCase() + segment.slice(1),
          path: newPath,
        } as breadcrumbPath;
      }) : [];
    const routes: breadcrumbPath[] = breadCrumbs ? breadCrumbs : [];
    const breadcrumbsLink = routes?.map(function(element: any, i:number){ 
        if (i + 1 === routes?.length) {
            return (
                <Typography key={element.path} color="text.primary">{element.breadcrumb}</Typography>
            );
            } else {
                return (
                    <Link color="inherit" underline="hover" key={i} href={element.path}>
                        {element.breadcrumb}
                    </Link>
                );
            }
        
    });
    return ( <Breadcrumbs>
        {breadcrumbsLink}
    </Breadcrumbs>)
        
}

export default Breadcrumb;