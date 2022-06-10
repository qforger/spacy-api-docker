import React from 'react';
import axios from 'axios';
import './App.css';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
type Todo = {
    userId: string,
    id: string,
    title: string,
    completed: string
};
class SentenceAnalyser extends React.Component<{}, { todos: Array<Todo> }> {
  constructor(props: any) {
    super(props);
    this.state = {
        todos:[]
    }
  }

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        this.setState({
          todos: response.data
        });
      })
  }

  render() {
    let todos: Array<Todo> = this.state.todos;
    return (
        <div className="App">
        <header className="App-header">
          <Form>
            <FormGroup>
              <Label for="inputSentence">
                Sentence to parse:
              </Label>
              <Input
                id="inputSentence"
                name="email"
                placeholder="enter sentence"
                type="text"
              />
            </FormGroup>
            <Button>
              Submit
            </Button>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>ID</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
            {todos.length ? 
              todos.map((todo:any) => (
                <tr>
                  <td>{todo.userId}</td>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed}</td>
                </tr>
              ))
              : 
              (<tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>)
            }
            </tbody>
          </Table>
        </header>
      </div>
    );
  }
}

export default SentenceAnalyser;