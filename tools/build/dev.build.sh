#!/usr/bin/env bash

export NODE_ENV=development
yarn
cp ./.env.dev ./.env
yarn dev