FROM ubuntu:jammy

WORKDIR /app
EXPOSE 3000

COPY . /app/

RUN apt-get update && apt-get install -y sudo curl wget git
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - && sudo apt-get install -y nodejs