#!/bin/sh

# Copy the sources code to the remote server
iac/retry-script.sh 3 scp -r app.tar.gz root@$1:/root

# Run initialization script on the remote serve
iac/retry-script.sh 3 ssh root@$1 "~/iac/retry-script.sh init-setup"