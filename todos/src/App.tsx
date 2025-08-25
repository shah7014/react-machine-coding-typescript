import TodosLayout from "./features/todos/components/TodosLayout";
import "./App.scss";

const App: React.FC = () => {
  return (
    <div className="container">
      <TodosLayout />
    </div>
  );
};

export default App;
