#!/bin/bash

pm2 kill
rm -rf smi-express
git clone --branch master --depth 1 https://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@github.com/gowrav-vishwakarma/smi.git smi-express

cd /home/ubuntu/smi-express/server
#aws s3 cp s3://solvemyissue.live-env-files/env.server ./.env
cp ../../env.server ./.env
npm ci
pm2 start bin/www
