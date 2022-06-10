import axios from 'axios';
import { StacyResponse } from '../types'
import SpacyApiRequester from "./SpacyApiRequester"


class SpacyApiManager {
    sentence:string = 'displaCy uses JavaScript, SVG and CSS to show you how computers understand language';
    model:string = 'en_core_web_md';
    format:string = 'spacy';

    constructor(sentence:string, model?:string, format?:string) {
        this.sentence = sentence || this.sentence;
        this.model = model || this.model;
        this.format = format || this.format;
    }

    public async getSentencesWithDependencies():Promise<string> {
        return SpacyApiRequester.getDepSentencesResponse(this.sentence, this.model)
    }

    public static async getDummyResponse(sentence:string, spacyMethod:string):Promise<StacyResponse> {
        let data:StacyResponse = {
            body: "",
            status: 0
        };

        if(sentence && spacyMethod) {
            try {
                let response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                data.status = response.status;
                data.body = response.data[0].title;
            } catch (error) {
                data.status = 500;
            }
        }
        return data;
    }

}

export default SpacyApiManager;