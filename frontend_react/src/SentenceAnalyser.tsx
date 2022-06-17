import React from 'react';
import SpacyApiManager from './api/SpacyApiManager'
import { PosAll, PosAllDependencies } from './types'
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
class SentenceAnalyser extends React.Component<{}, {spacyResponse:PosAll | null, sentenceInput:string }> {
  spacyApiManager?:SpacyApiManager;
  constructor(props: any) {
    super(props);

    let spavyDepAll:PosAll = {
      sentence: "",
      words: null
    }
    spavyDepAll.words = new Array<PosAllDependencies>(); 
    this.state = {
        spacyResponse: spavyDepAll,
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
      let data:PosAll = await this.spacyApiManager.getSentencesWithDependencies();
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
    let spavyDepAll:PosAll = {
      sentence: "",
      words: null
    }
    spavyDepAll.words = new Array<PosAllDependencies>();
    this.setState({
        spacyResponse: spavyDepAll,
        sentenceInput:""
    });
  }

  render() {
    let data:Array<PosAllDependencies>|null|undefined = this.state.spacyResponse?.words;
    if(!data) data = new Array<PosAllDependencies>(); 
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
            <FormGroup>
              <Button>
                Submit
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Sentence received: {this.state.spacyResponse?.sentence}</Label>
            </FormGroup> 
          </Form>
          <Table>
            <thead>
              <tr>
                <th scope="row">Word</th>
                <th scope="row">Lemma</th>
                <th scope="row">Norm</th>
                <th scope="row">LowCase</th>
                <th scope="row">SentGrade</th>
                <th scope="row">EntType</th>
                <th scope="row">POS</th>
                <th scope="row">Tag</th>
                <th scope="row">DepType</th>
                <th scope="row">DepTarget</th>
                <th scope="row">Alpha</th>
                <th scope="row">Digit</th>
                <th scope="row">StopWord</th>
                <th scope="row">Punct</th>
                <th scope="row">Url</th>
                <th scope="row">Number</th>
                <th scope="row">Email</th>
                <th scope="row">Language</th>
              </tr>
            </thead>
            <tbody>
            {data.length ? 
              data.map((dt:PosAllDependencies) => (
                <tr>
                  <td>{dt.word}</td>
                  <td>{dt.lemma}</td>
                  <td>{dt.norm}</td>
                  <td>{dt.lower}</td>
                  <td>{dt.sentiment}</td>
                  <td>{dt.entityType}</td>
                  <td>{dt.pos}</td>
                  <td>{dt.tag}</td>
                  <td>{dt.dep_type}</td>
                  <td>{dt.dep_target}</td>
                  <td>{dt.is_alpha}</td>
                  <td>{dt.is_digit}</td>
                  <td>{dt.is_stop}</td>
                  <td>{dt.is_punct}</td>
                  <td>{dt.is_url}</td>
                  <td>{dt.is_num}</td>
                  <td>{dt.is_email}</td>
                  <td>{dt.language}</td>
                </tr>
              ))
              : 
              (<tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
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