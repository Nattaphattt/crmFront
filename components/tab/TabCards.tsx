import { Tabs, Tab, Box, Card } from '@mui/material'
import React from 'react'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >

      <Card>
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </Card>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabCardsProps {
  currentTab: number;
  setTab: (newTab: number) => void;
  tabs: {
    name: string;
    component: React.ReactNode;
  }[]
}

export default function TabCards({ currentTab, setTab, tabs }: TabCardsProps) {

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <Tabs value={currentTab} onChange={handleChangeTab} aria-label="basic tabs example" variant='scrollable'
        sx={{
          "& .MuiTabs-flexContainer": { alignItems: 'end' },
          "& .MuiTab-root": { backgroundColor: '#F2F2F2', borderRadius: "10px 10px 0px 0px", height: '60px' },
          "& .Mui-selected": { backgroundColor: '#E8E8FA', color: "#3190FF", height: '72px' },
        }}>
        {tabs.map((item, index) => {
          return (
            <Tab key={item.name + index} label={item.name} {...a11yProps(index)} />
          )
        })}
      </Tabs>

      {tabs.map((item, index) => {
        return (
          <CustomTabPanel key={item.name + index} value={currentTab} index={index}>
            {item.component}
          </CustomTabPanel>
        )
      })}
    </>
  )
}
