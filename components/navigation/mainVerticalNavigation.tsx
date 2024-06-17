
'use client'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/components/navigation/mainVerticalNavigation.module.scss";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import Icon from '@/components/icon';
import javascriptSvg from '@/public/icons/javascript-svgrepo-com.svg';
import javascriptSvgDark from '@/public/icons/javascript-svgrepo-com-dark.svg';
import htmlSvg from '@/public/icons/html-5-svgrepo-com.svg';
import htmlSvgDark from '@/public/icons/html-5-svgrepo-com-dark.svg';
import cssSvg from '@/public/icons/css3-svgrepo-com.svg';
import cssSvgDark from '@/public/icons/css3-svgrepo-com-dark.svg';
import reactSvg from '@/public/icons/react-1-logo-svgrepo-com.svg';
import reactSvgDark from '@/public/icons/react-1-logo-svgrepo-com-dark.svg';
import nextjsSvg from '@/public/icons/triangle-svgrepo-com.svg';
import nextjsSvgDark from '@/public/icons/triangle-svgrepo-com-dark.svg';
import drupalSvg from '@/public/icons/drupal-svgrepo-com.svg';
import drupalSvgDark from '@/public/icons/drupal-svgrepo-com-dark.svg';
import vueSvg from '@/public/icons/vue-svgrepo-com.svg';
import vueSvgDark from '@/public/icons/vue-svgrepo-com-dark.svg';
import SqlSvg from '@/public/icons/database-svgrepo-com.svg';
import SqlSvgDark from '@/public/icons/database-svgrepo-com-dark.svg';
import MongoDbSvg from '@/public/icons/mongodb-opened-svgrepo-com.svg';
import MongoDbSvgDark from '@/public/icons/mongodb-opened-svgrepo-com-dark.svg';
import gitSvg from '@/public/icons/git-branch-svgrepo-com.svg';
import gitSvgDark from '@/public/icons/git-branch-svgrepo-com-dark.svg';
import dockerSvg from '@/public/icons/docker-svgrepo-com.svg';
import dockerSvgDark from '@/public/icons/docker-svgrepo-com-dark.svg';
import dnsSVG from '@/public/icons/router-svgrepo-com.svg';
import dnsSVGDark from '@/public/icons/router-svgrepo-com-dark.svg';
import phpSvg from '@/public/icons/php-svgrepo-com.svg';
import phpSvgDark from '@/public/icons/php-svgrepo-com-dark.svg';
import terminalSVG from '@/public/icons/terminal-svgrepo-com.svg';
import terminalSVGDark from '@/public/icons/terminal-svgrepo-com-dark.svg';
import computerSVG from '@/public/icons/computer-svgrepo-com.svg';
import computerSVGDark from '@/public/icons/computer-svgrepo-com-dark.svg';
import nodeSVG from '@/public/icons/node-js-svgrepo-com.svg';
import nodeSVGDark from '@/public/icons/node-js-svgrepo-com-dark.svg';
import { usePathname, useRouter } from 'next/navigation';

const MainVerticalNavigation: React.FC = () => {

  const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
  const router = useRouter();
  const pathname = usePathname();
  const isMedium = theme.breakpoints.between('md', 'lg');

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="Side Navigation"
    >
      <ListItemButton onClick={(event) => { router.push('/programming-foundation') }} className={ pathname === '/programming-foundation' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon   className={styles.ListItemIcon}>
          <Icon svg={isLight ? computerSVG : computerSVGDark} alt={'Computer Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Programming Foundation" sx={{ display: { md: 'none', lg: 'block'} }}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/terminal') }} className={ pathname === '/terminal' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? terminalSVG : terminalSVGDark} alt={'Terminal Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Terminal" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/dns') }} className={ pathname === '/dns' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? dnsSVG : dnsSVGDark} alt={'Router Icon'} size='lg'/>
        </ListItemIcon>
        <ListItemText primary="DNS" sx={{display: { md: 'none', lg: 'block' }}} />
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/git') }} className={ pathname === '/git' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? gitSvg : gitSvgDark} alt={'Git Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="GIT" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/courses/html') }} className={ pathname === '/courses/html' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? htmlSvg : htmlSvgDark} alt={'HTML Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="HTML" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/css') }} className={ pathname === '/css' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? cssSvg : cssSvgDark} alt={'CSS Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="CSS" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/javascript') }} className={ pathname === '/javascript' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? javascriptSvg : javascriptSvgDark} alt={'Javascript Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Javascript" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/php') }} className={ pathname === '/php' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? phpSvg : phpSvgDark} alt={'PHP Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="PHP" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/nodejs') }} className={ pathname === '/nodejs' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? nodeSVG : nodeSVGDark} alt={'NodeJs Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="NodeJs" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/react') }} className={ pathname === '/react' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? reactSvg : reactSvgDark} alt={'React Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="React" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/nextjs') }} className={ pathname === '/nextjs' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? nextjsSvg : nextjsSvgDark} alt={'Next Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="NextJs" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/vue') }} className={ pathname === '/vue' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? vueSvg : vueSvgDark} alt={'Vue Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Vue" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/docker') }} className={ pathname === '/docker' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? dockerSvg : dockerSvgDark} alt={'Docker Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Docker" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/sql') }} className={ pathname === '/sql' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? SqlSvg : SqlSvgDark} alt={'SQL Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="SQL" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/mongodb') }} className={ pathname === '/mongodb' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? MongoDbSvg : MongoDbSvgDark} alt={'MongoDb Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="MongoDb" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push('/drupal') }} className={ pathname === '/drupal' ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? drupalSvg : drupalSvgDark} alt={'Drupal Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Drupal" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      
    </List>
  );
};

export default MainVerticalNavigation;
