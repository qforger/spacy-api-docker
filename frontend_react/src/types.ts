export enum SpacyAPI {
    dependencies = '/dep',
    entities = '/ent',
    sents = '/sents',
    sents_dep = '/sents_dep',
    all_pos = '/all_pos',
    models = '/models',
    version = '/version'
}

export interface PosAll {
  sentence: string,
  words: Array<PosAllDependencies> | null
}
export interface PosAllDependencies {
    word: string,
    lemma: string,
    norm: string,
    lower: string,
    sentiment: string,
    entityType: string,
    pos: string,
    tag: string,
    dep_type: string,
    dep_target: string,
    is_alpha: string,
    is_digit: string,
    is_stop: string,
    is_punct: string,
    is_url: string,
    is_num: string,
    is_email: string,
    language: string
};