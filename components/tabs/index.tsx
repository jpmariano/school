'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, Paper, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import useWindowDimensions from '@/utils/useWindowDimensions';
import styles from '@/styles/components/tabs/tabs.module.scss';

import { useAppDispatch} from '@/store/store';
import { Children } from 'react';
//import colors from '@/styles/colors.module.scss';

export interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export interface TabsCustomProps {
    children?: React.ReactNode;
    errorMessage?: string | null;
}


const Item = styled(Paper)(({ theme }) => ({}));

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{}}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const MuiTabs: React.FC<TabsCustomProps> = ({
  children,
  errorMessage,
}: TabsCustomProps) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const dispatch = useAppDispatch();
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const { height, width } = useWindowDimensions();

  let isLight: boolean = true;
  if (theme.palette.mode === 'dark') {
    isLight = false;
  }

  type VariantOptions = 'fullWidth' | 'scrollable' | 'standard' | undefined;
  let isScrollable = 'fullWidth' as VariantOptions;

  if (width <= 520) {
    isScrollable = 'scrollable';
  }




  return (
    <Box className="Tabs" sx={{ justifyContent: 'center' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          variant={isSm ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          className={Children.count(children) > 3 ? styles.morthan3Button : styles.button}
          aria-label="tab list"
          sx={{
            '& .Mui-selected': { bgcolor: "#1d2c55", color: "white" },
            '& .MuiTabs-flexContainer': { height: '57px', justifyContent: isLg ? isSm ? 'center' : 'flex-end' : 'flex-start'},
            '& .MuiButtonBase-root.MuiTab-root.MuiTab-fullWidth ': { flexGrow: isLg ? 0 : 1, minWidth: isLg ? '100px' : 'inherit'},
            bgcolor: "white",
            color:  "#1d2c55",
          }}
          TabIndicatorProps={{ style: { background: 'none' } }}
        >
          {children &&
                Children.toArray(children).map((item: React.ReactNode, i: number) => {
                if (React.isValidElement(item)) {
                  if (item.props.title) { 
                    return (
                      <Tab key={i} className={`tab${i.toString()}`} sx={{}} label={<span>{item.props.title}</span>} {...a11yProps(i)} />
                    );
                  } else {
                      return (
                        <Tab key={i} className={`tab${i.toString()}`}  label={<span>No Title</span>} {...a11yProps(i)} />
                      );
                  }
                }
              })}
        </Tabs>
      </AppBar>
      <Divider light className={styles.divider} />
      {errorMessage && (
        <Typography
          fontFamily={'Barlow'}
          sx={{ color: "red", textAlign: 'center' }}
          minHeight="24px"
        >
          {errorMessage}
        </Typography>
      )} 
      {children &&
        Children.toArray(children).map((item: React.ReactNode, i: number) => {
          return (
            <TabPanel key={i} value={value} index={i} dir={theme.direction}>
              {item}
            </TabPanel>
          );
        })}
    </Box>
  );
};

export default MuiTabs;
