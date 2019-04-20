import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { id: 1, description: 'Cook dinner' , isCompleted: true },
        { id: 2, description: 'Do the dishes' , isCompleted: false },
        { id: 3, description: 'Give the baby a bath' , isCompleted: false }
      ],
      newTodoDescription: ''
    };

    this.deleteTodo = this.deleteTodo.bind(this);
  }

  handleChange(e){
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();

    if (!this.state.newTodoDescription) { return }

    console.log('handleSubmit called');

    const newTodo = {
      description: this.state.newTodoDescription,
      isCompleted: false,
      id: this.state.todos.length + 1,
    };

    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  toggleComplete(index){
    const todos = this.state.todos.slice();
    const todo = todos[index];

    todo.isCompleted = todo.isCompleted ? false : true;

    this.setState({ todos });
  }

  deleteTodo(id){
    const todos = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos
    })
  }

  render(){
    return (
      <div className="App">
        <ul>
          {
            this.state.todos.map((todo, index) => (
              <ToDo
                key={ index }
                description={ todo.description }
                isCompleted={ todo.isCompleted }
                toggleComplete={ () => this.toggleComplete(index) }
                onDelete={ this.deleteTodo }
                todoid={ todo.id }
              />
            ))
          }
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <input
            type="text"
            value={ this.state.newTodoDescription }
            onChange={ (e) => this.handleChange(e) }
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
