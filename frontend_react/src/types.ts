export enum SpacyAPI {
    dependencies = '/dep',
    entities = '/ent',
    sents = '/sents',
    sents_dep = '/sents_dep',
    models = '/models',
    version = '/version'
}

export type StacyResponse = {
    body: string,
    status: number
};