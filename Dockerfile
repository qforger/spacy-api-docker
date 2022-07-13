FROM python:3.9
LABEL maintainer="gtc@q-forge.io"
LABEL version="0.1"
LABEL description="English language spacy."

# Install the required packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    supervisor \
    curl &&\
#   nginx && \
    apt-get -q clean -y && rm -rf /var/lib/apt/lists/* && rm -f /var/cache/apt/*.bin

COPY ./build_sassc.sh /app/build_sassc.sh

# Build SASSC
RUN bash /app/build_sassc.sh

# Copy and set up the app
COPY . /app

# Set WORKDIR
WORKDIR /app

# Install node for the frontend
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
  apt-get install -y nodejs &&\
  apt-get -q clean -y && rm -rf /var/lib/apt/lists/* && rm -f /var/cache/apt/*.bin

RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version

# Build app
RUN cd /app/frontend_react && make clean && make
RUN cd /app && make clean && make

# Configure nginx & supervisor
RUN mv /app/config/supervisor.conf /etc/supervisor/conf.d/
#mv /app/config/nginx.conf /etc/nginx/sites-available/default &&\
#  echo "daemon off;" >> /etc/nginx/nginx.conf && \

ENV PORT 9000
ENV HOST_ADDR "http://localhost"
ENV API_PORT 18000
ENV REACT_APP_HOST_ADDR ${HOST_ADDR}
ENV REACT_APP_HOST_PORT ${API_PORT}

CMD ["bash", "/app/start.sh"]

#ENV languages "en_core_web_md"
ENV languages "en_core_web_trf"
RUN cd /app && env/bin/download_models
#docker build -t spacy-api-docker:0.1 .
#docker run -p 9000:9000/tcp -p 8000:8000/tcp -it spacy-api-docker:0.1 bash
# sudo docker run -e HOST_ADDR=http://<ip> -e REACT_APP_HOST_ADDR=http://<ip> -p 9000:9000/tcp -p 8000:8000/tcp -it spacy-api-docker:0.1
#docker exec -it c834d7805c8c bash
