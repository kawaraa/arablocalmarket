#!/bin/sh
ls

# Copy the sources code to the remote server
scp -r ./backend/app.tar.gz root@$1:/root

# Run initialization script on the remote serve
ssh root@$1 "~/iac/retry-script.sh init-setup"