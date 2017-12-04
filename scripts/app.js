import React from 'react';
import {List, Map} from 'immutable';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: List(),
      todo: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState(({todos, todo}) => {
      const newTodo = Map({text: todo, done: false});

      return {
        todos: todos.push(newTodo),
        todo: ''
      }
    });
  }

  handleChange(e) {
    this.setState({todo: e.target.value});
  }

  handleDelete(i) {
    this.setState(({todos}) => {
      return {
        todos: todos.remove(i)
      };
    });
  }

  handleCheck(i) {
    this.setState(({todos}) => {
      return {
        todos: todos.update(i, (todo) => {
          return todo.update('done', (done) => !done);
        })
      };
    });
  }

  render() {
    const {todos, todo} = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={todo} onChange={this.handleChange} />
        </form>
        {
          todos.map((todo, i) => {
            return (
              <div key={i}>
                <p>{todo.get('text')}</p>
                <input
                  type="checkbox"
                  value={todo.get('done')}
                  onChange={() => {
                    this.handleCheck(i);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    this.handleDelete(i);
                  }}
                >Delete</button>
              </div>
            );
          })
        }
      </div>
    )
  }
}
