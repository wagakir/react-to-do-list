import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setFilter } from "../redux/slices/tasks";

export default function CustomTabPanel() {
  const dispath = useAppDispatch();
  const { filter } = useAppSelector((state) => state.tasksSlice);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispath(setFilter(newValue));
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          value={filter}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Текущие" {...a11yProps(0)} value={"active"} />
          <Tab label="Все" {...a11yProps(1)} value={""} />
          <Tab label="Выполненные" {...a11yProps(2)} value={"completed"} />
          <Tab label="Корзина" {...a11yProps(3)} value={"deleted"} />
        </Tabs>
      </Box>
    </Box>
  );
}
