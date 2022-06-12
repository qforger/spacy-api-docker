//- ----------------------------------
//- 💥 DISPLACY DEMO
//- ----------------------------------

'use strict';

{
    const defaultText = 'displaCy uses JavaScript, SVG and CSS to show you how computers understand language';
    const defaultModel = 'en_core_web_trf';
    const loading = () => document.body.classList.toggle('loading');
    const onError = (err) => $('#error').style.display = 'block';

    const displacy = new displaCy(api, {
        container: '#displacy',
        engine: 'spacy',
        defaultText: defaultText,
        defaultModel: defaultModel,
        distance: 200,
        offsetX: 150,
        arrowSpacing: 10,
        arrowWidth: 8,
        arrowStroke: 2,
        wordSpacing: 40,
        font: 'inherit',
        color: '#f5f4f0',
        bg: '#272822',
        onStart: loading,
        onSuccess: loading
    });


    // UI

    const $ = document.querySelector.bind(document);


    // First Run

    document.addEventListener('DOMContentLoaded', () => {
        const text = getQueryVar('text') || getQueryVar('full') || getQueryVar('manual') || getQueryVar('steps') || defaultText;
        const model = getQueryVar('model') || defaultModel;
        
        const args = [text, model];

        if (getQueryVar('text')) updateView(...args);
        if (getQueryVar('full') || getQueryVar('manual') || getQueryVar('steps')) updateURL(...args);
    });


    // Run Demo

    const run = (
        text = $('#input').value || defaultText,
        model = $('[name="model"]:checked').value || defaultModel) => {
        displacy.parse(text, model);
        updateView(text, model);
        updateURL(text, model);
    }


    // UI Event Listeners

    $('#submit').addEventListener('click', ev => run());
    $('#input').addEventListener('keydown', ev => (event.keyCode == 13) && run());
    $('#download').addEventListener('click', ev => $('#download').setAttribute('href', downloadSVG()).click());


    // Update View

    const updateView = (text, model) => {
        $('#input').value = text;
        $(`[value="${model}"]`).checked = true;
    }


    // Update URL

    const updateURL = (text, model) => {
        const url = [
            'text=' + encodeURIComponent(text),
            'model=' + encodeURIComponent(model)
        ];

        history.pushState({ text, model }, null, '?' + url.join('&'));
    }

    // Get URL Query Variables

    const getQueryVar = (key) => {
        const query = window.location.search.substring(1);
        const params = query.split('&').map(param => param.split('='));

        for (let param of params)
            if (param[0] == key) return decodeURIComponent(param[1]);
        return false;
    }


    // Download SVG

    const downloadSVG = () => {
        const serializer = new XMLSerializer();
        return ($('#displacy-svg')) ? 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString($('#displacy-svg'))) : false;
    }
}