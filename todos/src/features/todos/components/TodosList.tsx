import { useTodosContext } from "../context/TodosContext";
import { TodoActionType } from "../todo-type";

const TodosList: React.FC = () => {
  const { todos, dispatch } = useTodosContext();

  if (todos.length === 0) {
    return <></>;
  }

  const handleTodoToggle = (id: number) => () => {
    dispatch({ type: TodoActionType.TOGGLE_TODO, payload: id });
  };

  const handleDeleteTodo = (id: number) => () => {
    dispatch({ type: TodoActionType.DELETE_TODO, payload: id });
  };

  return (
    <ul className="todoslist">
      {todos.map((todo) => (
        <li key={todo.id} className="todoslist-item">
          <input
            type="checkbox"
            name={`todo-${todo.id}-toggle`}
            value={todo.text}
            checked={todo.isCompleted}
            onChange={handleTodoToggle(todo.id)}
          />
          <span className={todo.isCompleted ? "todo--completed" : ""}>
            {todo.text}
          </span>
          <button onClick={handleDeleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodosList;
