import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../features/tasks/taskSlice";
import type { AppDispatch } from "../store";
import { taskSchema } from "../schemas/taskSchema";
import type { TaskFormData } from "../schemas/taskSchema";

import { ZodError } from "zod";
import "bootstrap/dist/css/bootstrap.min.css";

interface TaskFormProps {
  task?: any;
  onClose: () => void;
}

const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignedUserId(String(task.assignedUserId));
      setStartDate(new Date(task.startDate).toISOString().split("T")[0]);
      setEndDate(new Date(task.endDate).toISOString().split("T")[0]);
    }
  }, [task]);


  const validateData = (data: TaskFormData) => {
    try {
      taskSchema.parse(data);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        const errorObj = err.errors.reduce((acc, curr) => {
          acc[curr.path[0] as keyof TaskFormData] = curr.message;
          return acc;
        }, {} as Partial<Record<keyof TaskFormData, string>>);

        setErrors(errorObj);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: TaskFormData = {
      id: task?.id ,
      title,
      description,
      assignedUserId,
      startDate,
      endDate ,
      isCompleted: task ? task.isCompleted : false,
    };

    if (!validateData(taskData)) return;

    try {
      if (task) {
        await dispatch(updateTask(taskData)).unwrap();
      } else {
        await dispatch(createTask(taskData)).unwrap();
      }
      onClose();
    } catch (err: any) {
      console.error("Error submitting task:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label>Assigned User ID</label>
        <input
          type="text"
          className={`form-control ${errors.assignedUserId ? "is-invalid" : ""}`}
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {errors.assignedUserId && (
          <div className="invalid-feedback">{errors.assignedUserId}</div>
        )}
      </div>

      <div className="mb-3">
        <label>Start Date</label>
        <input
          type="date"
          className={`form-control ${errors.startDate ? "is-invalid" : ""}`}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
      </div>

      <div className="mb-3">
        <label>End Date</label>
        <input
          type="date"
          className={`form-control ${errors.endDate ? "is-invalid" : ""}`}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
