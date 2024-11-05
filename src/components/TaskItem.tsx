import { IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { setTaskStatus, Task } from "../redux/slices/tasks";
import { useAppDispatch } from "../hooks";
import { Check, SettingsBackupRestore } from "@mui/icons-material";

const TaskItem = (props: Task) => {
  const dispath = useAppDispatch();
  const handleRemove = () => {
    if (window.confirm("Удалить задачу?")) {
      dispath(setTaskStatus({ id: props.id, status: "deleted" }));
    }
  };
  const handleRecover = () => {
    dispath(setTaskStatus({ id: props.id, status: "" }));
  };
  const handleCompleted = () => {
    dispath(setTaskStatus({ id: props.id, status: "completed" }));
  };
  return (
    <ListItem
      secondaryAction={
        <>
          {props.status !== "completed" && props.status !== "deleted" && (
            <IconButton
              onClick={handleCompleted}
              edge="end"
              aria-label="completed"
            >
              <Check />
            </IconButton>
          )}
          {props.status !== "deleted" ? (
            <IconButton onClick={handleRemove} edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleRecover} edge="end" aria-label="restore">
              <SettingsBackupRestore />
            </IconButton>
          )}
        </>
      }
    >
      <ListItemText
        primary={props.value}
        secondary={
          props.status === "deleted" && "задача удалится через несколько дней"
        }
      />
    </ListItem>
  );
};

export default TaskItem;
