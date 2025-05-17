export interface Task {
  id?: number | null;
  title: string;
  assignedUserId: string;
  description: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

