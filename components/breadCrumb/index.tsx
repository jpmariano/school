'use client'
import {BreadcrumbItem, Options, breadcrumbPath} from '@/types';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


interface BreadcrumbProps {
    route: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ route }) => {
    const breadcrumbsLink = route?.map(function(element: any, i:number){ 
        if (i + 1 === route?.length) {
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