import React from 'react';
import axios from 'axios';
import './App.css';
import SpacyApiManager from './api/SpacyApiManager'
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
type Todo = {
    userId: string,
    id: string,
    title: string,
    completed: string
};
class SentenceAnalyser extends React.Component<{}, { todos: Array<Todo>, spacyResponse:string }> {
  spacyApiManager?:SpacyApiManager;
  constructor(props: any) {
    super(props);
    this.state = {
        todos:[],
        spacyResponse:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
   Here we restrict all handleClicks to be exclusively on 
   HTMLButton Elements
  */
   handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log('You clicked submit.');
    let responseData: any;
    new Promise(async (res, rej) => {
      this.spacyApiManager = new SpacyApiManager("Click on thing123 option, and check if at least one card with text containing thing123 appears, otherwise scroll down and try again.");
      let data = await this.spacyApiManager.getSentencesWithDependencies();
      res(data);
    }).then((responseBody) => {
      responseData = responseBody;
    });
    this.setState({
      spacyResponse: responseData
    });
    console.log(this.state.spacyResponse);
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
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="inputSentence">
                Sentence to parse:
              </Label>
              <Input
                id="inputSentence"
                name="sentenceToParse"
                placeholder="enter text"
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