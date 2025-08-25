import { useState } from "react";
import { useTodosContext } from "../context/TodosContext";
import { TodoActionType } from "../todo-type";

const NewTodoInput = () => {
  const { dispatch } = useTodosContext();

  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim().length !== 0) {
      dispatch({
        type: TodoActionType.ADD_TODO,
        payload: { text: input, isCompleted: false },
      });
      setInput("");
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === "enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="newtodo-input">
      <input
        type="text"
        placeholder="Type a New Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default NewTodoInput;
