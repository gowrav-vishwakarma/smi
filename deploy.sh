#!/bin/bash

SSH_CMD=$(
    cat <<EOF
cd  ~ &&
 ./deploy.sh 
EOF
)
ssh -vi ~/.ssh/ec2UbuntuSolvemyissue.pem ubuntu@$35.154.23.10 $SSH_CMD
