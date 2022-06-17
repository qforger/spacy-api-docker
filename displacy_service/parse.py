class Parse(object):
    def __init__(self, nlp, text):
        self.doc = nlp(text)

    def to_json(self):
        words = [{'text': w.text, 'pos': w.pos_, 'tag': w.tag_, 'head': w.head.text, 'dep': w.dep_} for w in self.doc]
        arcs = []
        for word in self.doc:
            if word.i < word.head.i:
                arcs.append(
                    {
                        'start': word.i,
                        'end': word.head.i,
                        'head': word.head.text,
                        'label': word.dep_,
                        'text': str(word),
                        'pos': word.pos_,
                        'dir': 'left'
                    })
            elif word.i > word.head.i:
                arcs.append(
                    {
                        'start': word.head.i,
                        'end': word.i,
                        'head': word.head.text,
                        'label': word.dep_,
                        'text': str(word),
                        'pos': word.pos_,
                        'dir': 'right'
                    })
        return {'words': words, 'arcs': arcs}


class Entities(object):
    def __init__(self, nlp, text):
        self.doc = nlp(text)

    def to_json(self):
        return [
            {
                'start': ent.start_char,
                'end': ent.end_char,
                'type': ent.label_,
                'text': str(ent)
            } for ent in self.doc.ents
        ]


class Sentences(object):
    def __init__(self, nlp, text):
        self.doc = nlp(text)

    def to_json(self):
        sents = [sent.text.strip() for sent in self.doc.sents]
        return sents


class SentencesDependencies(object):
    def __init__(self, nlp, text):

        self.doc = nlp(text)

    def to_json(self):
        sents = []
        for sent in self.doc.sents:
            words = [{'text': w.text, 'pos': w.pos_, 'tag': w.tag_, 'head': w.head.text, 'dep': w.dep_} for w in sent]
            arcs = []
            for word in sent:
                if word.i < word.head.i:
                    arcs.append(
                        {
                            'start': word.i,
                            'end': word.head.i,
                            'head': word.head.text,
                            'label': word.dep_,
                            'text': str(word),
                            'pos': word.pos_,
                            'dir': 'left'
                        })
                elif word.i > word.head.i:
                    arcs.append(
                        {
                            'start': word.head.i,
                            'end': word.i,
                            'head': word.head.text,
                            'label': word.dep_,
                            'text': str(word),
                            'pos': word.pos_,
                            'dir': 'right'
                        })

            sents.append({'sentence': sent.text.strip(),
                          'dep_parse': {'words': words,
                                        'arcs': arcs}})
        return sents


class Posalldependencies(object):
    def __init__(self, nlp, text):
        self.doc = nlp(text)

    def to_json(self):
        sents = []
        for sent in self.doc.sents:
            words = [{'text': w.text, 'lemma': w.lemma_, 'norm': w.norm_, 'lower': w.lower_, 'sentiment': str(w.sentiment),'ent_type': w.ent_type_, 'pos': w.pos_, 'tag': w.tag_, 'dep': w.dep_, 'head': w.head.text, 'is_alpha': str(w.is_alpha), 'is_digit': str(w.is_digit), 'is_stop': str(w.is_stop), 'is_punct': str(w.is_punct), 'is_currency': str(w.is_currency), 'is_url': str(w.like_url), 'is_num': str(w.like_num), 'is_email': str(w.like_email), 'language': w.lang_ } for w in sent ]
            sents.append({'sentence': sent.text.strip(), 'words': words})
        return sents