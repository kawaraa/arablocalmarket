#!/bin/sh

echo "(($1)) VM IP Address"
sleep 10
# Copy the sources code to the remote server
# iac/retry-script.sh 3 scp -r app.tar.gz root@$1:/root
scp -r app.tar.gz root@$1:/root

# # Run initialization script on the remote serve
ssh root@$1 "~/iac/retry-script.sh init-setup"