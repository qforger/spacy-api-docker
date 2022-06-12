FROM bbieniek/spacyapi:base_v3

ENV languages "en_core_web_trf de_core_news_sm es_core_news_sm fr_core_news_sm it_core_news_sm nl_core_news_sm pt_core_news_sm"
RUN cd /app && env/bin/download_models
