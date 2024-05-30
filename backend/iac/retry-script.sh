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
      echo ""
      echo "[!!!] >>> failed '$*' Waiting for the next try"
      echo ""
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
    retry_command 3 apt-get install $PROGRAM_NAME -y
    retry_command 3 $INSTALL_COMMAND # Execute additional command
    echo "$PROGRAM_NAME is now installed."
  fi
}

# $* contains the args as string
if [[ "$*" != *"init-setup"* ]]; then
  retry_command $@
else
  echo "No arguments were passed, then will setup the server"

  sudo su -
  export DEBIAN_FRONTEND=noninteractive

  # retry_command 3 apt-get clean
  # retry_command 3 apt-get install -f
  # retry_command 3 apt-get update -y

  # # === Install program if missing ===

  # Install Node.js and NPM
  retry_command 3 curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
  sleep 5
  export DEBIAN_FRONTEND=noninteractive
  retry_command 3 apt-get install nodejs -y
  # retry_command 3 apt-get install nodejs -y | debconf-set-selections
  sleep 5
  retry_command 3 apt-get install npm -y
  retry_command 3 npm install -g pm2@latest

  # Install NGINX server and configure/setup the firewall
  check_and_install "nginx" "systemctl nginx start"
  retry_command 2 ufw allow 'Nginx HTTP' 
  retry_command 2 ufw allow 'Nginx HTTPS'
  retry_command 2 ufw enable
  cp ~/iac/nginx/nginx.conf /etc/nginx/nginx.conf
  cp ~/iac/nginx/default-server.conf /etc/nginx/sites-available/default

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
  # check_and_install "certbot" "apt-get install python3-certbot-nginx -y \
  # && certbot --nginx -d arablocalmarket.com -d api.arablocalmarket.com \
  # && sudo certbot renew --dry-run"

  # Additional commands for application setup
  rm -f ~/.pm2/logs/*
  npm install --production
  NODE_ENV=production pm2 restart app --cron-restart="0 23 * * *" || pm2 start server.js --name app
  pm2 save # save the current PM2 process list to ensure that your application restarts on boot
  sudo pm2 startup # Generate Startup Script so it restarts on boot
  systemctl restart nginx

fi