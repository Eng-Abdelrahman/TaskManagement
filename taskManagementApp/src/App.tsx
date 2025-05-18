import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import TaskList from "./pages/TaskList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
   <><TaskList /><ToastContainer position="top-right" autoClose={3000} hideProgressBar /></>
  );
}

export default App;