import axios from 'axios';
import { SpacyAPI, PosAll, PosAllDependencies } from '../types'
const hostAddress: string = (process.env.REACT_APP_HOST_ADDR as string);
class SpacyApiRequester {
    public static async getDepSentencesResponse(sentence:string, model:string):Promise<PosAll> {
        let posAll:PosAll = {
            sentence: "",
            words: null
        }
        if(sentence && model) {
            try {
                var response = await axios.post(
                    `${hostAddress}:8000${SpacyAPI.all_pos}`,
                    { 'text': sentence, 'model': model },
                    {
                        headers: {
                          'Content-Type': 'text/plain'
                        }
                    }
                );
                posAll = SpacyApiRequester.parseDepResponse(response.data);

            } catch (e:any) {
                throw new Error("Error occured: " + e.message)
            }
        }
        return posAll;
    }

    private static parseDepResponse(response: any):PosAll {
        let data = response[0];
        let resp: PosAll = {
            sentence: data.sentence,
            words: null
        }
        resp.words = new Array<PosAllDependencies>()
        if(data.words) {
            for (let index = 0; index < data.words.length; index++) {
                const element = data.words[index];
                resp.words.push({
                    word: element.text,
                    lemma: element.lemma,
                    norm: element.norm,
                    lower: element.lower,
                    sentiment: element.sentiment,
                    entityType: element.ent_type,
                    pos: element.pos,
                    tag: element.tag,
                    dep_type: element.dep,
                    dep_target: element.head,
                    is_alpha: element.is_alpha,
                    is_digit: element.is_digit,
                    is_stop: element.is_stop,
                    is_punct: element.is_punct,
                    is_url: element.is_url,
                    is_num: element.is_num,
                    is_email: element.is_email,
                    language: element.language
                })
            }
        }
        return resp;
    }

}

export default SpacyApiRequester;