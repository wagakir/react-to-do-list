import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import CustomTabPanel from "../../components/CustomTabPanel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddTask } from "@mui/icons-material";
import { addTask, setTasks } from "../../redux/slices/tasks";
import TaskItem from "../../components/TaskItem";
import { Navigate } from "react-router-dom";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const Home = () => {
  const dispath = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const { tasks, filter } = useAppSelector((state) => state.tasksSlice);
  const [inputValue, setInputValue] = React.useState("");
  const handleClearTasks = () => {
    if (window.confirm("Удалить все задачи?")) {
      dispath(setTasks([]));
      window.localStorage.removeItem("tasks");
    }
  };
  const handleCreateTask = () => {
    if (inputValue === "") {
      alert("Введите задачу");
      return;
    }
    const fields = { value: inputValue, status: "active", id: tasks.length };
    dispath(addTask(fields));
  };
  React.useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }
  return (
    <div className="h-full w-full mx-10">
      <Paper
        sx={{
          m: 3,
          p: 2,
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Button
          sx={{ mx: 3, my: 1 }}
          variant="contained"
          color="success"
          onClick={handleCreateTask}
        >
          {"Добавить"}
          <AddTask />
        </Button>
        <TextField
          type="search"
          variant="standard"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          label="Введите задачу"
          sx={{ mx: 3, my: 1, flex: 1, minWidth: 80 }}
        />
        <Button
          sx={{ mx: 3, my: 1 }}
          variant="contained"
          color="error"
          onClick={handleClearTasks}
        >
          {"Очистить"}
        </Button>
      </Paper>
      <Paper sx={{ m: 3, p: 2 }}>
        <Grid item xs={12} md={6}>
          <CustomTabPanel />
          <Demo>
            <List dense={false}>
              {tasks
                .filter((obj) => obj.status === filter || filter === "")
                .map((obj) => (
                  <TaskItem {...obj} key={obj.id} />
                ))}
              {tasks.length === 0 && (
                <ListItem>
                  <ListItemText primary="Задач в выбранной категории нет" />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
