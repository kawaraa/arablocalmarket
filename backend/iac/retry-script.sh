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
  cp ~/cloudflare.crt /etc/ssl/cloudflare/cloudflare.crt
  cp ~/cloudflare.key /etc/ssl/cloudflare/cloudflare.key
  sudo chmod 600 /etc/ssl/cloudflare/cloudflare.key
  sudo chmod 644 /etc/ssl/cloudflare/cloudflare.crt
  
  check_and_install "nginx" "systemctl start nginx"
  cp ~/iac/nginx/nginx.conf /etc/nginx/nginx.conf
  cp ~/iac/nginx/default-server.conf /etc/nginx/sites-available/default
  
  # # Allow only Cloudflare IPs if cloudflare is connected:
  # sudo ufw allow from 173.245.48.0/20
  # sudo ufw allow from 103.21.244.0/22
  # sudo ufw allow from 103.22.200.0/22
  # sudo ufw allow from 103.31.4.0/22
  # sudo ufw allow from 141.101.64.0/18
  # sudo ufw allow from 108.162.192.0/18
  # sudo ufw allow from 190.93.240.0/20
  # sudo ufw allow from 188.114.96.0/20
  # sudo ufw allow from 197.234.240.0/22
  # sudo ufw allow from 198.41.128.0/17
  # sudo ufw allow from 162.158.0.0/15
  # sudo ufw allow from 104.16.0.0/13
  # sudo ufw allow from 104.24.0.0/14
  # sudo ufw allow from 172.64.0.0/13
  # sudo ufw allow from 131.0.72.0/22

  # # Deny all other incoming traffic:
  # sudo ufw default deny incoming

  ufw allow 'Nginx HTTP' 
  ufw allow 'Nginx HTTPS'
  ufw enable

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