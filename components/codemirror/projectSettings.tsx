
'use client'
import React, { ChangeEvent, ReactHTMLElement, useEffect, useState } from 'react';
import { Box, Button, Card, FormControl, FormHelperText, IconButton, Input, Modal, Popover, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeedIcon from '@mui/icons-material/Feed';
import styles from "@/styles/components/codemirror/projectsettings.module.scss";
import CloseIcon from '@mui/icons-material/Close';
import CodeReadOnly from '@/components/codemirror/codeReadonly';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import useWindowDimensions from '@/utils/useWindowDimensions';
import AddIcon from '@mui/icons-material/Add';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            sx={{flex: '1 100%', overflow: 'scroll'}}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export interface projectSettingsProps {
    head?: String[];
}

const ProjectSettings: React.FC<projectSettingsProps> = ({head}) => {
   
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [inputFields, setInputFields] = useState<String[]>(head ? head : []);
    const { height, width } = useWindowDimensions();
    const containerHeight = height/1.67;
    const codeMirrorHeight = height/1.67 - 35;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFormChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    let data = [...inputFields];
        data[index] = event.target.value;
        setInputFields(data);
    }
    const removeFields = (index: number) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    const addFields = () => {
        let newfield = '';
        setInputFields([...inputFields, newfield])
    }

    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(!open)
    };
    const handleClose = () => {
        setOpen(!open)
    };

    return (
        <Box className="answer-icon-btn" title="Project Settings">
            <IconButton onClick={handleOpen} sx={{ color: open ? "#FCB61C" : isLight ? '#121212' : '#ffffff', float: 'right', marginRight: '25px'}} aria-label="Solution">
                <SettingsIcon fontSize="medium" /> <Typography component="p" variant='body1'>Settings</Typography> 
            </IconButton>
            <Modal
            id={'test'}
                open={open}
                onClose={handleClose}
                aria-labelledby="project-setttings-modal"
                aria-describedby="project-setttings-modal"
                className={styles.modal}
            >
                <Card variant="outlined" className={styles.card}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography component={'h3'} variant={'body1'} sx={{flexGrow: 2, textAlign: 'center', marginTop: '4px' }}>{`Project Settings`}</Typography>
                        <IconButton onClick={handleClose} sx={{ color: isLight ? '#121212' : '#ffffff' }} aria-label="Solution">
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex',  height: `${containerHeight}px` }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Head" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                            <Tab label="Item Four" {...a11yProps(3)} />
                            <Tab label="Item Five" {...a11yProps(4)} />
                            <Tab label="Item Six" {...a11yProps(5)} />
                            <Tab label="Item Seven" {...a11yProps(6)} />
                        </Tabs>
                        <TabPanel value={tabValue} index={0} >
                            <FormControl sx={{ width: 1, flex: '1 100%'}}>
                                {inputFields && 
                                    inputFields.map((item: String, i: number) => {
                                       return <Box key={i}  component="div" sx={{display: 'flex', columnGap: '20px', marginBottom: '20px', width: '100%'}}>
                                                <TextField placeholder="<meta>,<link><script>" inputProps={{style: {fontFamily: "Barlow"}}}  
                                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(i, event)}
                                                sx={{ fontFamily: "Barlow !important", flex: '0  100%' }} value={item} label="Tag" variant="outlined" />
                                                <Button variant="outlined" sx={{ flex: '0 0 auto' }} startIcon={<DeleteIcon />} onClick={() => removeFields(i)}>Delete</Button>
                                       </Box>
                                    })
                                }
                                <Button variant="outlined" sx={{ flex: '0 0 auto' }} startIcon={<AddIcon />} onClick={addFields}>Add More</Button>
                            </FormControl>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            Item Three
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            Item Four
                        </TabPanel>
                        <TabPanel value={tabValue} index={4}>
                            Item Five
                        </TabPanel>
                        <TabPanel value={tabValue} index={5}>
                            Item Six
                        </TabPanel>
                        <TabPanel value={tabValue} index={6}>
                            Item Seven
                        </TabPanel>
                    </Box>
                </Card>
            </Modal>
        </Box>
    );
};

export default ProjectSettings;
