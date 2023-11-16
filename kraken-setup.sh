#!/bin/bash
docker compose down -v
docker rmi $(docker images -a -q) -f
docker compose up -d db-kraken
docker compose up -d ghost-kraken
npm run --prefix kraken kraken
