terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "digitalocean_token" {
  sensitive = true
}
provider "digitalocean" {
  token = var.digitalocean_token
}

resource "digitalocean_ssh_key" "web" {
  name       = "VM SSH key"
  public_key = file("${path.module}/id_rsa.pub")
}

resource "digitalocean_droplet" "web" {
  name   = "alm-backend-test"
  region = "fra1"
  image  = "ubuntu-23-10-x64"
  size   = "s-1vcpu-1gb"
  # disk     = "25"
  ssh_keys = [digitalocean_ssh_key.web.id]
  tags     = ["api", "alm"]

  provisioner "remote-exec" {
    connection {
      host        = self.ipv4_address
      user        = "root"
      type        = "ssh"
      private_key = file("${path.module}/id_rsa")
    }

    # Update VM
    # inline = [
    #   "export DEBIAN_FRONTEND=noninteractive",
    #   "apt-get update -y",
    # ]
    inline = [
      <<-EOF
      #!/bin/bash
      set -e
      
      retry_command() {
        local retries=$1
        shift
        local count=0
        until "$@"; do
          count=$((count + 1))
          if [ $count -lt $retries ]; then
            echo 
            echo "[!!!] >>> Waiting for the next try"
            echo
            sleep 20
          else
            return $?
          fi
        done
        return 0 
      }

      sleep 30
      export DEBIAN_FRONTEND=noninteractive

      sudo apt-get update -y
      sleep 5
      curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
      apt-get install -y nodejs
      sleep 5
      apt-get install -y npm
      sleep 5
      npm install -g pm2@latest
        
      sudo apt-get install -y nginx
      sudo systemctl start nginx
      sudo systemctl enable nginx
      ufw allow 'Nginx HTTP'
      ufw allow 'Nginx HTTPS
      ufw enable

      rm -f ~/.pm2/logs/*
      EOF
    ]

  }
}

resource "digitalocean_project" "alm_project" {
  name        = "ArabLocalMarket"
  description = "This projeect represents production resources for ArabLocalMarket App."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.web.urn]
}

output "droplet_ip" {
  value = digitalocean_droplet.web.ipv4_address
}

