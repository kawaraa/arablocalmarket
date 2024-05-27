const { exec, execSync } = require("child_process");

// Function to execute a command and return a promise
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
      } else if (stderr) {
        reject(`stderr: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Function to check and install a program, execute additional command if not installed
const checkAndInstall = async (programName, installCommand) => {
  try {
    await execCommand(`dpkg -l | grep -qw ${programName}`);
    console.log(`${programName} is already installed!`);
  } catch (error) {
    try {
      await execCommand(`DEBIAN_FRONTEND=noninteractive apt-get -y install ${programName}`);
      await execCommand(installCommand);
      console.log(`${programName} is now installed.`);
    } catch (installError) {
      console.error(`Failed to install ${programName}: ${installError}`);
    }
  }
};

const main = async (databasePsw) => {
  try {
    process.env.DEBIAN_FRONTEND = "noninteractive";

    execSync("apt-get -y clean");
    execSync("apt-get -y update");

    // Install NGINX server and configure/setup the firewall
    await checkAndInstall(
      "nginx",
      `
      service nginx start &&
      ufw allow 'Nginx HTTP' &&
      ufw allow 'Nginx HTTPS' &&
      ufw enable &&
      cp ./iac/nginx/nginx.conf /etc/nginx/nginx.conf &&
      cp ./iac/nginx/default-server.conf /etc/nginx/sites-available/default
    `
    );

    // Install Node.js and NPM
    execSync("curl -fsSL https://deb.nodesource.com/setup_20.x | bash -");
    execSync("DEBIAN_FRONTEND=noninteractive apt-get -y install nodejs");
    execSync("DEBIAN_FRONTEND=noninteractive apt-get -y install npm");
    execSync("npm install -g pm2@latest");

    // Additional commands for application setup
    execSync("rm -f ~/.pm2/logs/*");
  } catch (error) {
    console.error(`Setup failed: ${error}`);
  }
};

// Run the main function with the database password argument
const databasePsw = process.argv[2];
main(databasePsw);
