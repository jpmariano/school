
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/components/logo/logo.module.scss";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';

const MainVerticalNavigation: React.FC = () => {

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="Main Navigation"
    >
      <ListItemButton>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary="HTML" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </List>
  );
};

export default MainVerticalNavigation;
