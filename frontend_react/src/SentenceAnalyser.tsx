import React from 'react';
import axios from 'axios';
import SpacyApiManager from './api/SpacyApiManager'
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
type Todo = {
    userId: string,
    id: string,
    title: string,
    completed: string
};
class SentenceAnalyser extends React.Component<{}, { todos: Array<Todo>, spacyResponse:string, sentenceInput:string }> {
  spacyApiManager?:SpacyApiManager;
  constructor(props: any) {
    super(props);
    this.state = {
        todos:[],
        spacyResponse:"",
        sentenceInput:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  /*
   Here we restrict all handleClicks to be exclusively on 
   HTMLButton Elements
  */
   handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log('You clicked submit. Enter:' + this.state.sentenceInput);
    let responseData: any;
    new Promise(async (res, rej) => {
      this.spacyApiManager = new SpacyApiManager(this.state.sentenceInput);
      let data = await this.spacyApiManager.getSentencesWithDependencies();
      res(data);
    }).then((responseBody) => {
      responseData = responseBody;
      this.setState({
        spacyResponse: responseData
      });
      console.log(this.state.spacyResponse);
    });
  }

  updateInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    // ...       
    this.setState({
      sentenceInput: val
    });
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
        <div>
        <header>
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
                value={this.state.sentenceInput}
                onChange={evt => this.updateInputValue(evt)}
              />
            </FormGroup>
            <Button>
              Submit
            </Button>
          </Form>
          <Table>
            <thead>
              <tr>
                <th scope="row">User ID</th>
                <th scope="row">ID</th>
                <th scope="row">Title</th>
                <th scope="row">Completed</th>
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