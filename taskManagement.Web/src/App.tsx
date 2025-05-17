import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTasks from "./pages/MyTasks";
import TaskForm from "./pages/TaskForm";
import { Button } from "@shadcn/ui/button";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
          <h1 className="font-bold text-lg">Task Management</h1>
          <div className="space-x-4">
            <Button asChild variant="link">
              <a href="/tasks">Task List</a>
            </Button>
            <Button asChild variant="link">
              <a href="/create-task">Create Task</a>
            </Button>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/tasks" element={<MyTasks />} />
            <Route path="/create-task" element={<TaskForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
