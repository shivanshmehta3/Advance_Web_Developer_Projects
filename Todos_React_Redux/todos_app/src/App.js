import './App.css';
import TodoList from './TodoList/todolist'
import Form from './NewTodoForm/Form'

function App() {
  return (
    <div className="App">
		<h1>My TodoList</h1>
		<TodoList/>
		<Form/>
    </div>
  );
}

export default App;
