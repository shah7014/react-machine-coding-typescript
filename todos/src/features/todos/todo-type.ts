export type Todo = {
  text: string;
  isCompleted: boolean;
  id: number;
};

export type TodosInitialState = {
  todos: Todo[];
};

export enum TodoActionType {
  ADD_TODO = "todos/addTodo",
  DELETE_TODO = "todos/deleteTodo",
  TOGGLE_TODO = "todos/toggleTodo",
}

type AddTodoAction = {
  type: TodoActionType.ADD_TODO;
  payload: Omit<Todo, "id">;
};

type DeleteTodoAction = {
  type: TodoActionType.DELETE_TODO;
  payload: number;
};

type ToggleTodoAction = {
  type: TodoActionType.TOGGLE_TODO;
  payload: number;
};

export type TodosAction = AddTodoAction | DeleteTodoAction | ToggleTodoAction;
