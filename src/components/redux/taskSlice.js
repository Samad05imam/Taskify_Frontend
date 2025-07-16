import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
