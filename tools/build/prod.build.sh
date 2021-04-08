#!/usr/bin/env bash

export NODE_ENV=production

yarn
yarn build
cp ./.env.prod ./.env
pm2-runtime start ecosystem.config.js