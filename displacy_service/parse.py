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
