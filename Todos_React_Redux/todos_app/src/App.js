import './App.css';
import TodoList from './TodoList/todolist'
import Form from './NewTodoForm/Form'
import {Link, Route, Redirect} from 'react-router-dom'

function App() {
  return (
    <div className="App">
		<h1>My TodoList</h1>
		<p>
			<Link to = '/todos'>See my Todos</Link>
		</p>
		<p>
			<Link to = '/form'>Add Todo</Link>
		</p>
		<Route path = '/todos' component = {TodoList}/>
		<Route path = '/form' component = {Form}/>
		<Route path = '/' render = {() => <Redirect to = 'todos'/>}/>
		  
    </div>
  );
}

export default App;
