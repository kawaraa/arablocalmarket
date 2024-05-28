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
# variable "database_psw" {
#   sensitive = true
# }

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
    inline = [
      "export DEBIAN_FRONTEND=noninteractive",
      # "apt-get clean",
      # "apt-get install -f",
      "apt-get update -y",
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

