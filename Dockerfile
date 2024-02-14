FROM ubuntu:jammy
RUN apt-get update
RUN apt-get install -y sudo curl wget git
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - && sudo apt-get install -y nodejs