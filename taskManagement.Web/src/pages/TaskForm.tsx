import { Button } from "@shadcn/ui";
import { Card, CardHeader, CardContent } from "@shadcn/ui";
import { Link } from "react-router-dom";
import { TaskForm } from "../components/TaskForm";

export default function CreateTaskPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Create New Task</h2>
        <Button asChild variant="outline">
          <Link to="/tasks">Back to Tasks</Link>
        </Button>
      </div>
      <Card>
        <CardHeader className="bg-gray-50 p-4 border-b">New Task</CardHeader>
        <CardContent className="p-4">
          <TaskForm />
        </CardContent>
      </Card>
    </div>
  );
}