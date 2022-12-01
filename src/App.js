import ToDoPage from "./pages/toDoPage";
import { TodoContext, TodoContextProvider } from "./context/ToDoContext";

export default function App() {
  return (
    <TodoContextProvider>
      <ToDoPage />
    </TodoContextProvider>
  );
}
