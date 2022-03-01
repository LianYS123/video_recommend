#! /bin/bash

ssh lian2
cd ~/projects/video_recommend/server
set -x
git pull
npm run stop
npm run serve
set +x
