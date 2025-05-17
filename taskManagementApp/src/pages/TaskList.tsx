import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, markComplete } from "../features/tasks/taskSlice";
import type { RootState, AppDispatch } from "../store";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import TaskForm from "./TaskForm";
import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
  const [taskId, setTaskId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task: any) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleCreate = () => {
    setTaskToEdit(null);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    setTaskId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (taskId !== null) {
        await dispatch(deleteTask(taskId)).unwrap();   
    }
    setShowDeleteModal(false);
  };

  const handleMarkComplete = async (id: number) => {
    setTaskId(id);
    setShowCompleteModal(true);
  };
   const confirmComplete = async () => {
    if (taskId !== null) {
         await dispatch(markComplete(taskId)).unwrap();   
    }
    setShowCompleteModal(false);
  };


  return (
    <div className="task-list-container">
      <div className="header mb-3 d-flex justify-content-between align-items-center">
        <h2>Task List</h2>
        <Button variant="primary" onClick={handleCreate}>
          Create New Task
        </Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
          <span className="ms-2">Loading tasks...</span>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned User</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.assignedUserId}</td>
                  <td>{new Date(task.endDate).toLocaleDateString()}</td>
                  <td>{task.isCompleted ? "Completed" : "Pending"}</td>
                  <td>
                      <div className="action-buttons">
                        <button className="icon-btn edit-btn" onClick={() => handleEdit(task)}>
                          <FaEdit size={18} />
                        </button>
                        <button className="icon-btn delete-btn" onClick={() => handleDelete(task.id?? 0)}>
                          <FaTrashAlt size={18} />
                        </button>
                        {!task.isCompleted && (
                          <button className="icon-btn complete-btn" onClick={() => handleMarkComplete(task.id ?? 0)}>
                            <FaCheckCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

       {/* Complete Confirmation Modal */}
      <Modal show={showCompleteModal} onHide={() => setShowCompleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to complete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmComplete}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Task Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{taskToEdit ? "Edit Task" : "Create New Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            task={taskToEdit}
            onClose={() => {
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList;
