#! /bin/bash

STATIC_DIR=/root/projects/video_recommend/server/static/ # 服务器上静态资源文件地址

ssh -T lian2 'rm -rf '${STATIC_DIR}'*'
scp dist/browser.zip lian2:${STATIC_DIR}
ssh lian2 'cd '${STATIC_DIR}' && unzip -q browser.zip'
