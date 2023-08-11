
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/components/logo/logo.module.scss";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import Icon from '@/components/icon';
import javascriptSvg from '@/public/icons/javascript-svgrepo-com.svg';
import htmlSvg from '@/public/icons/html-5-svgrepo-com.svg';
import cssSvg from '@/public/icons/css3-svgrepo-com.svg';
import reactSvg from '@/public/icons/react-svgrepo-com.svg';
import nextjsSvg from '@/public/icons/nextjs-icon-svgrepo-com.svg';
import drupalSvg from '@/public/icons/drupal-icon-svgrepo-com.svg';
import vueSvg from '@/public/icons/vue-9-logo-svgrepo-com.svg';
import SqlSvg from '@/public/icons/database-svgrepo-com.svg';
import MongoDbSvg from '@/public/icons/mongodb-opened-svgrepo-com.svg';


const MainVerticalNavigation: React.FC = () => {

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="Main Navigation"
    >
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={htmlSvg} alt={'HTML Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="HTML" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={cssSvg} alt={'CSS Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="CSS" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={javascriptSvg} alt={'Javascript Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Javascript" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={reactSvg} alt={'React Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="React" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={nextjsSvg} alt={'Next Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="NextJs" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={vueSvg} alt={'Vue Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Vue" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={SqlSvg} alt={'SQL Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="SQL" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={MongoDbSvg} alt={'MongoDb Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="MongoDb" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <Icon svg={drupalSvg} alt={'Drupal Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Drupal" />
      </ListItemButton>
      
    </List>
  );
};

export default MainVerticalNavigation;
