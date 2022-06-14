import SpacyApiRequester from "./SpacyApiRequester"


class SpacyApiManager {
    sentence:string = 'displaCy uses JavaScript, SVG and CSS to show you how computers understand language';
    model:string = 'en_core_web_trf';
    format:string = 'spacy';

    constructor(sentence:string, model?:string, format?:string) {
        this.sentence = sentence || this.sentence;
        this.model = model || this.model;
        this.format = format || this.format;
    }

    public async getSentencesWithDependencies():Promise<string> {
        return SpacyApiRequester.getDepSentencesResponse(this.sentence, this.model)
    }

}

export default SpacyApiManager;