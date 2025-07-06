FROM oven/bun:1 AS base


WORKDIR /usr/app

COPY ./package*.json /usr/app/

RUN bun i

COPY . /usr/app/