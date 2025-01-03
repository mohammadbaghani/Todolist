import React, { Component } from 'react'
import Todo from '../Todo/Todo'
import './TodoList.css'
export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: JSON.parse(window.localStorage.getItem('todoList')) ? JSON.parse(window.localStorage.getItem('todoList')) : [],
            todoTitle: '',
            status: 'all'
        }

        this.addTodo = this.addTodo.bind(this)
        this.removeTodo = this.removeTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
    }

    todoTitleHandler(event) {
        this.setState({
            todoTitle: event.target.value
        })
    }
    addTodo(event) {
        event.preventDefault()
        if (this.state.todoTitle === "") {
            alert('لطفا فیلد را پر نمایید !')
        }
        else {
            let newTodoObject = {
                id: this.state.todos.length + 1,
                title: this.state.todoTitle,
                completed: false
            }
            this.setState(prevState => {
                return {
                    todos: window.localStorage.setItem('todoList', JSON.stringify([...prevState.todos, newTodoObject])),
                    todoTitle: '', todos: JSON.parse(window.localStorage.getItem('todoList')) ? JSON.parse(window.localStorage.getItem('todoList')) : [],
                }
            })
        }
    } removeTodo(todoId) {
        let newTodos = this.state.todos.filter(todo => {
            return todo.id !== todoId
        })
        this.setState({
            todos: window.localStorage.setItem('todoList', JSON.stringify(newTodos)),
            todos: JSON.parse(window.localStorage.getItem('todoList')) ? JSON.parse(window.localStorage.getItem('todoList')) : [],
        })
    }

    editTodo(todoId) {
        let newTodos = [...this.state.todos]
        newTodos.forEach(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed
            }
        })
        this.setState({
            todos: window.localStorage.setItem('todoList', JSON.stringify(newTodos)),
            todos: JSON.parse(window.localStorage.getItem('todoList')) ? JSON.parse(window.localStorage.getItem('todoList')) : []
        })
    }
    statusHandler(event) {
        this.setState({
            status: event.target.value
        })
    }
    render() {
        return (
            <div className='containerinput'>
                <header class="todo-header">
                </header>
                <p>
                </p>
                <form onSubmit={this.addTodo} className="all-todos">
                    <input type="text" className="todo-input" maxLength="40" placeholder='محل یادداشت شما ... ' value={this.state.todoTitle} onChange={this.todoTitleHandler} />
                    <button className="todo-button" type="submit">
                        <i className="fas fa-plus-square"></i>
                    </button>
                    <div className="select">
                        <select name="todos" className="filter-todo" onChange={this.statusHandler}>
                            <option className="option-todo" value="all">همه تکالیفم</option>
                            <option value="completed" className="option-todo">انجام دادم</option>
                            <option value="uncompleted" className="option-todo">انجام بدم</option>
                        </select>
                    </div>
                </form>
                <div className="todo-container">
                    <ul className="todo-list">
                        {this.state.status === 'completed' && this.state.todos.filter(todo => todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />))
                        }
                        {this.state.status === 'uncompleted' && this.state.todos?.filter(todo => !todo.completed).map(todo => (
                            <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />))
                        }
                        {
                            this.state.status === "all" && this.state.todos?.map(todo => (
                                <Todo key={todo.id} {...todo} onRemove={this.removeTodo} onEdit={this.editTodo} />))
                        }
                    </ul>
                </div>
            </div>

        )
    }
}
