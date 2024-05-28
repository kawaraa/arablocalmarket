#!/bin/bash

# This function expect the fist argument to be a (number of retries) 
retry_command() {
  local retries=$1
  shift
  local count=0
  # (until "$@") runs the command given as arguments to the function, if the command succeeds ends the loop
  until "$@"; do
    count=$((count + 1))
    if [ $count -lt $retries ]; then
      echo "Waiting for the next try"
      sleep 20 # Pauses the script for 3 seconds before retrying
    else
      # All retries have been exhausted. ($?) holds the exit status of the last executed command within the function
      return $?
    fi
  done
  return 0 
}

# Function to check and install a program, execute additional command if not installed
check_and_install() {
  PROGRAM_NAME=$1
  INSTALL_COMMAND=$2

 if which $PROGRAM_NAME > /dev/null 2>&1; then
    echo "$PROGRAM_NAME is already installed!"
  else
    retry_command 3 apt-get install -y $PROGRAM_NAME
    retry_command 3 $INSTALL_COMMAND # Execute additional command
    echo "$PROGRAM_NAME is now installed."
  fi
}

# $* contains the args as string
if [[ "$*" != *"init-setup"* ]]; then
  retry_command $@
else
  echo "No arguments were passed, then will setup the server"

  export DEBIAN_FRONTEND=noninteractive

  retry_command 3 apt-get clean -y
  retry_command 3 apt-get update -y

  # # === Install program if missing ===

  # Install Node.js and NPM
  retry_command 3 curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  retry_command 3 export DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs | debconf-set-selections
  retry_command 3 export DEBIAN_FRONTEND=noninteractive apt-get install -y npm
  # npm install -g npm@latest
  retry_command 3 npm install -g pm2@latest

  # Install NGINX server and configure/setup the firewall
  check_and_install "nginx" "service nginx start \
  && ufw allow 'Nginx HTTP' \
  && ufw allow 'Nginx HTTPS' \
  && ufw enable \
  && cp ./iac/nginx/nginx.conf /etc/nginx/nginx.conf \
  && cp ./iac/nginx/default-server.conf /etc/nginx/sites-available/default"

  # Install and configure MySQL Server on the same server
  # check_and_install "mysql-server" \
  # "mysql -u root -e \"DELETE FROM mysql.user WHERE User != 'root';\" \
  # && mysql -u root -e \"DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');\" \
  # && mysql -u root -e \"DROP DATABASE IF EXISTS test;\" \
  # && mysql -u root -e \"DELETE FROM mysql.db WHERE Db='test' OR Db='test\\\\_%';\" \
  # && mysql -u root -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY '$DATABASE_PSW';\" \
  # && mysql -u root -p$DATABASE_PSW -e \"FLUSH PRIVILEGES;\""
  # The following command is not necessary if Strapi is used
  # "mysql -u root -e \"mysql < ~/databases-initialize-create-update-statements.sql\"",

  # Set up and Enable SSL via certbot
  # check_and_install "certbot" "apt-get install -y python3-certbot-nginx \
  # && certbot --nginx -d arablocalmarket.com -d api.arablocalmarket.com \
  # && sudo certbot renew --dry-run"

  # Additional commands for application setup
  rm -f ~/.pm2/logs/*

fi