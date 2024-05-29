terraform {
  # The state configurations
  backend "gcs" {
    bucket = "arablocalmarket-bucket"
    prefix = "terraform/state"
  }

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

variable "alm_port" {
  default = 1337
}
variable "digitalocean_token" {
  sensitive = true
}

provider "digitalocean" {
  token = var.digitalocean_token
}

# This is already configured
# resource "digitalocean_tag" "alm_db_tag" {
#   name = "alm-db-tag"
# }
# resource "digitalocean_database_cluster" "alm_db" {
#   name       = "alm-database"
#   engine     = "mysql"
#   version    = "8"
#   size       = "db-s-1vcpu-1gb"
#   region     = "fra1"
#   node_count = 1
# }
# resource "digitalocean_database_firewall" "alm_db-fw" {
#   cluster_id = digitalocean_database_cluster.alm_db.id

#   rule {
#     type = "droplet"
#     # value = digitalocean_droplet.vm.id
#     value = digitalocean_tag.alm_db_tag.id
#   }
# }

resource "digitalocean_ssh_key" "auth" {
  name       = "VM SSH key"
  public_key = file("${path.module}/id_rsa.pub")
}

# Docs for Digitalocean Resources:
# https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs
resource "digitalocean_droplet" "vm" {
  count = 1
  name  = "alm-backend-${count.index}"
  # name   = "alm-backend-test"
  region = "fra1"
  image  = "ubuntu-23-10-x64"
  size   = "s-1vcpu-1gb"
  # disk     = "25"
  # monitoring = true
  # private_networking = true
  ssh_keys = [digitalocean_ssh_key.auth.id]
  tags     = ["api", "alm", digitalocean_tag.alm_db_tag.id]


  provisioner "remote-exec" {
    connection {
      host        = self.ipv4_address
      user        = "root"
      type        = "ssh"
      private_key = file("${path.module}/id_rsa")
    }

    # Update VM
    inline = [
      "sleep 10",
      "export DEBIAN_FRONTEND=noninteractive",
      "systemctl daemon-reload",
      "echo VM is ready for SSH connection",
      # "systemctl restart droplet-agent",
      # fuser command to kill processes that are using the apt-get command or holding locks on the package manager.
      # "sudo fuser -vki /var/lib/dpkg/lock",
      # "sudo fuser -vki /var/cache/apt/archives/lock",
      # "sudo fuser -vki /var/cache/debconf/config.dat",
      "apt-get update -y",
    ]

  }
}

# This is already configured
# resource "digitalocean_certificate" "alm_cert" {
#   name    = "alm-ssl-certificate"
#   type    = "lets_encrypt"
#   domains = ["api.arablocalmarket.com"]
# }

# # This is already configured
# resource "digitalocean_loadbalancer" "public" {
#   name   = "alm-loadbalancer"
#   region = "fra1"

#   forwarding_rule {
#     entry_port     = 80
#     entry_protocol = "http"

#     target_port     = var.alm_port
#     target_protocol = "http"
#   }

#   # if digitalocean_certificate is enabled
#   forwarding_rule {
#     entry_port     = 443
#     entry_protocol = "https"

#     target_port     = var.alm_port
#     target_protocol = "http"

#     certificate_name = digitalocean_certificate.alm_cert.name
#   }

#   healthcheck {
#     port     = var.alm_port
#     protocol = "http"
#     path     = "/"
#   }

#   # if digitalocean_certificate is enabled
#   # redirect_http_to_https = true
#   # droplet_ids = [digitalocean_droplet.vm.id] # if it's one node
#   droplet_ids = digitalocean_droplet.vm.*.id # if it's more then one node
# }

# ========== digitalocean droplet firewall ==========
# Docs: https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs/resources/firewall
# resource "digitalocean_firewall" "vm_fw" {
#   name = "vms-firewall-rules-only-22-80-and-443"

#   droplet_ids = digitalocean_droplet.vm.*.id

#   inbound_rule {
#     protocol         = "tcp"
#     port_range       = "22"
#     source_addresses = ["0.0.0.0/0", "::/0"] # allow anyone to ssh into vms
#     # source_addresses = ["192.168.1.0/24", "2002:1:2::/48"] # Or restrict access
#   }
#   inbound_rule {
#     protocol   = "tcp"
#     port_range = "80"
#     # source_addresses = ["0.0.0.0/0", "::/0"] # allow anyone to access vms via http
#     source_load_balancer_uids = [digitalocean_loadbalancer.public.id] # allow only loadbalancer
#   }
#   inbound_rule {
#     protocol   = "tcp"
#     port_range = "443"
#     # source_addresses = ["0.0.0.0/0", "::/0"]  # allow anyone to access vms via https
#     source_load_balancer_uids = [digitalocean_loadbalancer.public.id] # allow only loadbalancer
#   }
#   inbound_rule {
#     protocol         = "icmp"
#     source_addresses = ["0.0.0.0/0", "::/0"]
#   }

#   outbound_rule {
#     protocol              = "tcp"
#     port_range            = "1-65535"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }
#   outbound_rule {
#     protocol              = "udp"
#     port_range            = "1-65535"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }
#   outbound_rule {
#     protocol              = "icmp"
#     destination_addresses = ["0.0.0.0/0", "::/0"]
#   }
# }

resource "digitalocean_project" "alm_project" {
  name        = "ArabLocalMarket"
  description = "This projeect represents production resources for ArabLocalMarket App."
  purpose     = "Web Application"
  environment = "Production"
  # resources   = [digitalocean_droplet.vm.urn]
  resources = [digitalocean_droplet.vm.*.urn, digitalocean_loadbalancer.public.urn]
  # resources   = digitalocean_droplet.vm.*.urn # if it's more then one node
}

output "droplet_ip" {
  value = digitalocean_droplet.vm.ipv4_address
  # value = digitalocean_loadbalancer.public.ip
}



# inline = [
#   <<-EOF
#   #!/bin/bash
#   set -e

#   retry_command() {
#     local retries=$1
#     shift
#     local count=0
#     until "$@"; do
#       count=$((count + 1))
#       if [ $count -lt $retries ]; then
#         echo 
#         echo "[!!!] >>> Waiting for the next try"
#         echo
#         sleep 20
#       else
#         return $?
#       fi
#     done
#     return 0 
#   }

#   sleep 30
#   export DEBIAN_FRONTEND=noninteractive

#   retry_command 3 sudo apt-get update -y
#   sleep 10
#   retry_command 3 curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
#   retry_command 3 apt-get install -y nodejs
#   sleep 10
#   retry_command 3 apt-get install -y npm
#   sleep 10
#   retry_command 3 npm install -g pm2@latest

#   retry_command 3 sudo apt-get install -y nginx
#   retry_command 3 sudo systemctl start nginx
#   retry_command 3 sudo systemctl enable nginx
#   ufw allow 'Nginx HTTP'
#   ufw allow 'Nginx HTTPS
#   ufw enable

#   rm -f ~/.pm2/logs/*
#   EOF
# ]


