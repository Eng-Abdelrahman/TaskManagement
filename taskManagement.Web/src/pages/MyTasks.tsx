import { Button } from "@shadcn/ui/button";
import { Card, CardHeader, CardContent } from "@shadcn/ui/card";
import { Link } from "react-router-dom";
import { TaskList } from "../components/TaskList";

export default function MyTasks() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Button asChild>
          <Link to="/create-task">Create Task</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="bg-gray-50 p-4 border-b">Tasks</CardHeader>
        <CardContent className="p-4">
          <TaskList />
        </CardContent>
      </Card>
    </div>
  );
}