import pytest

import spacy
from displacy_service.parse import Parse


@pytest.fixture(scope="session")
def nlp():
    return spacy.load('en_core_web_trf')


def test_parse_to_json(nlp):
    parse = Parse(nlp, u'Hello, this is a parse.')
    json_model = parse.to_json()
    assert len(json_model['words']) == 7
    assert len(json_model['arcs']) == 6