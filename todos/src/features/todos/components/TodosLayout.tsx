import NewTodoInput from "./NewTodoInput";
import TodosList from "./TodosList";
import "./TodosLayout.scss";
import { TodosContextProvider } from "../context/TodosContext";

const TodosLayout = () => {
  return (
    <TodosContextProvider>
      <div className="todos">
        <h1 className="todos__title">Todos</h1>
        <div className="todos__input">
          <NewTodoInput />
        </div>
        <div className="todos__list">
          <TodosList />
        </div>
      </div>
    </TodosContextProvider>
  );
};

export default TodosLayout;
