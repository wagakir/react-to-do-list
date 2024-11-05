import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getTasksFromLS } from "../../utils/getTasksFromLS";
export interface Task {
  value: string;
  status: string;
  id: number;
}
export type Tasks = Task[];
export interface TasksState {
  tasks: Tasks;
  filter: string;
}
const { tasks } = getTasksFromLS();
const initialState: TasksState = {
  tasks,
  filter: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Tasks>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    setTaskStatus: (
      state,
      action: PayloadAction<{ id: number; status: string }>
    ) => {
      state.tasks = state.tasks.map((obj) =>
        obj.id === action.payload.id
          ? { ...obj, status: action.payload.status }
          : obj
      );
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTasks, setFilter, addTask, setTaskStatus } =
  tasksSlice.actions;

export default tasksSlice.reducer;
