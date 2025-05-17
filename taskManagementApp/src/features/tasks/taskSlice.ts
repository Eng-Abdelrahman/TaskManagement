import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";
import { toast } from "react-toastify";
import type { Task, TaskState } from "../../models/task-model";

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await taskService.fetchTasks();
      return tasks;
    } catch (error: any) {
      toast.error("Failed to fetch tasks");
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Partial<Task>, { rejectWithValue }) => {
    try {
      const response = await taskService.createTask(task);
      toast.success(response.message || "Task created successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Error creating task");
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task, { rejectWithValue }) => {
    try {
      const response = await taskService.updateTask(task);
      toast.success(response.message || "Task updated successfully");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Error updating task");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await taskService.deleteTask(id);
      toast.success(response.message || "Task deleted successfully");
      return id;
    } catch (error: any) {
      toast.error(error.message || "Error deleting task");
      return rejectWithValue(error.message);
    }
  }
);

export const markComplete = createAsyncThunk(
  "tasks/markComplete",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await taskService.markTaskComplete(taskId);
      toast.success(response.message || "Task marked as complete");
      return response.data;
    } catch (error: any) {
      toast.error(error.message || "Error marking task as complete");
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markComplete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markComplete.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(markComplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
