#!/bin/bash

DATABASE_PSW=$1

# Function to check and install a program, execute additional command if not installed
check_and_install() {
  PROGRAM_NAME=$1
  INSTALL_COMMAND=$2

  # apt-cache search $PROGRAM_NAM
  # which xx > /dev/null 2>&1 | grep -qw "not found"
  # if $PROGRAM_NAM -v  2>&1 | grep -qw "command not found"; then
  if ! dpkg -l | grep -qw $PROGRAM_NAME; then
    apt-get -y install $PROGRAM_NAME
    $INSTALL_COMMAND  # Execute additional command
    echo "$PROGRAM_NAME is now installed."
  else
    echo "$PROGRAM_NAME is already installed!"
  fi
}

export DEBIAN_FRONTEND=noninteractive

apt-get -y clean
apt-get -y update


# === Install program if missing ===

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

# Install Node.js and NPM
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs
DEBIAN_FRONTEND=noninteractive apt-get -y install npm
# npm install -g npm@latest
npm install -g pm2@latest

# Set up and Enable SSL via certbot
# check_and_install "certbot" "apt-get install python3-certbot-nginx \
# && certbot --nginx -d arablocalmarket.com -d api.arablocalmarket.com \
# && sudo certbot renew --dry-run"

# Additional commands for application setup
rm -f ~/.pm2/logs/*