'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs, { TabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import useWindowDimensions from '@/utils/useWindowDimensions';
import styles from '@/styles/components/tabs/jktabs.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { addSubtitles } from '@/store/features/jkTabsSubtitleSlice';
import { Children } from 'react';
//import colors from '@/styles/colors.module.scss';

export interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

export interface TabsCustomProps {
    titles: string[];
    subtitles?: string[];
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
  titles,
  subtitles,
  children,
  errorMessage,
}: TabsCustomProps) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [arrSubtitles, setArrSubtitles] = React.useState<string[]>(
    subtitles ? subtitles : []
  );
  const dispatch = useAppDispatch();
  const tabsubtitle = useAppSelector((state) => state.tabsubtitle);

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

  React.useEffect(() => {
    subtitles &&
      subtitles.map((title: string, i: number) => {
        return dispatch(addSubtitles({ subtitles: title }));
      });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    tabsubtitle.subtitles.length !== 0 &&
      setArrSubtitles(tabsubtitle.subtitles);
  }, [tabsubtitle]);

  return (
    <Box id="jkTabs" sx={{ justifyContent: 'center' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="tab list"
          sx={{
            '& .Mui-selected': { bgcolor: "blue", color: "white" },
            '& .MuiTabs-flexContainer': { height: '57px' },
            bgcolor: "white",
            color: "blue",
          }}
          TabIndicatorProps={{ style: { background: 'none' } }}
        >
          {subtitles
            ? titles.map((title: string, i: number) => {
                return (
                  <Tab
                    key={i}
                    label={
                      <span>
                        <span>{title}</span>
                        <span className={styles.subtitles}>
                          {arrSubtitles[i]}
                        </span>
                      </span>
                    }
                    {...a11yProps(i)}
                  />
                );
              })
            : titles.map((title: string, i: number) => {
                return (
                  <Tab key={i} label={<span>{title}</span>} {...a11yProps(i)} />
                );
              })}
        </Tabs>
      </AppBar>
      <Divider light className={styles.divider} />
      <Typography
        fontFamily={'Barlow'}
        sx={{ color: "red", textAlign: 'center' }}
        minHeight="24px"
      >
        {errorMessage}
      </Typography>
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
