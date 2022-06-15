#!/bin/bash

while [ $# -gt 0 ]; do
    if [[ $1 == *"--"* ]]; then
        v="${1/--/}"
        declare $v="$2"
    fi
    shift
done

rm -rf smi-express-app
git clone --branch master --depth 1 https://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@github.com/gowrav-vishwakarma/smi.git smi-express-app

cd /home/ubuntu/smi-express-app/client
#aws s3 cp s3://solvemyissue.live-env-files/env.client ./.env
cp ../../env.client ./.env

npm ci
npm run build
aws s3 sync ./dist s3://solvemyissue.live
