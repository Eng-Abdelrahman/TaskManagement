import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, markTaskComplete } from '../redux/taskSlice';
import type { AppDispatch, RootState } from '../store';

export function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleComplete = (id: number) => {
    dispatch(markTaskComplete(id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Task List</h2>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
              <span className="text-gray-700 font-medium">{task.title}</span>
              <button
                onClick={() => handleComplete(task.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
              >
                {task.isCompleted ? 'Completed' : 'Mark Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
