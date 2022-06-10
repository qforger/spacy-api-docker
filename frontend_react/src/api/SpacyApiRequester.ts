import axios from 'axios';
import { SpacyAPI } from '../types'

class SpacyApiRequester {
    public static async getDepSentencesResponse(sentence:string, model:string):Promise<string> {
        let data = "";
        if(sentence && model) {
            try {
                var response = await axios.post(
                    `http://localhost:8080${SpacyAPI.sents_dep}`,
                    { 'text': sentence, 'model': model },
                    {
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                        }
                    }
                );
                data = JSON.stringify(response.data);
            } catch (e:any) {
                throw new Error("Error occured: " + e.message)
            }
        }
        return data;
    }

}

export default SpacyApiRequester;