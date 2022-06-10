import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Form>
          <FormGroup>
            <Label for="inputSentence">
              Email
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
      </header>
    </div>
  );
}

export default App;
