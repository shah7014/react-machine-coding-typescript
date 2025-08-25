import { createContext, useContext, useReducer } from "react";
import {
  TodosAction,
  TodosInitialState,
  Todo,
  TodoActionType,
} from "../todo-type";

type TodoContextType = {
  todos: Todo[];
  dispatch: React.ActionDispatch<[action: TodosAction]>;
};

const TodosContext = createContext<TodoContextType | null>(null);

const initlaState: TodosInitialState = { todos: [] };

const todosReducer = (
  state: TodosInitialState = initlaState,
  action: TodosAction
) => {
  switch (action.type) {
    case TodoActionType.ADD_TODO: {
      return { todos: [...state.todos, { ...action.payload, id: Date.now() }] };
    }
    case TodoActionType.DELETE_TODO: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }
    case TodoActionType.TOGGLE_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, isCompleted: !todo.isCompleted };
          }
          return todo;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export const TodosContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(todosReducer, initlaState);

  return (
    <TodosContext.Provider value={{ todos: state.todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("TodosContext is used outside of TodosContextProvider");
  }

  return context;
};
