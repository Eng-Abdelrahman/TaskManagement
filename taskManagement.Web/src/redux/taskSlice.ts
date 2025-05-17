import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskService } from '../services/TaskService';

interface Task {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const data = await TaskService.getTasks();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id' | 'isCompleted'>, { rejectWithValue }) => {
  try {
    const data = await TaskService.createTask(task);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const markTaskComplete = createAsyncThunk('tasks/markTaskComplete', async (id: number, { rejectWithValue }) => {
  try {
    const data = await TaskService.markTaskComplete(id);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
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
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(markTaskComplete.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload.id);
        if (task) task.isCompleted = true;
      });
  },
});

export default taskSlice.reducer;
