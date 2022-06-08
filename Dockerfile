FROM python:3.9
LABEL maintainer="gtc@q-forge.io"
LABEL version="0.1"
LABEL description="English language spacy."

# Install the required packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    supervisor \
    curl \
    nginx && \
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
RUN cd /app/frontend && make clean && make
RUN cd /app && make clean && make

# Configure nginx & supervisor
RUN mv /app/config/nginx.conf /etc/nginx/sites-available/default &&\
  echo "daemon off;" >> /etc/nginx/nginx.conf && \
  mv /app/config/supervisor.conf /etc/supervisor/conf.d/

ENV PORT 4443
EXPOSE 4443
CMD ["bash", "/app/start.sh"]

ENV languages "en_core_web_md"
RUN cd /app && env/bin/download_models