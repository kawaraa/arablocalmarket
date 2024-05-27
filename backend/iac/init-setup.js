const { exec, execSync } = require("child_process");
const programs = require("./commands.json");
process.env.DEBIAN_FRONTEND = "noninteractive";

// Function to execute a command and return a promise
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message); // Error
      } else if (stderr) {
        reject(stderr); // StdError
      } else {
        resolve(stdout); // stdout (Executed)
      }
    });
  });
};

// Function to check and install a program, execute additional command if not installed
const checkAndInstall = async (program) => {
  try {
    if (program.name) {
      const err = await execCommand(`which ${program.name}`)
        .then(() => true)
        .catch(() => false);
      // const err = await execCommand(`dpkg -l | grep -qw ${program.name}`).catch((err) => err);
      if (err) return `${program.name} is already installed!`;

      await execCommand(`DEBIAN_FRONTEND=noninteractive apt-get -y install ${program.name}`);
      console.log(`${program.name} is now installed and configured.`);
    }

    for (const command of program.commands) {
      await execCommand(command)
        .then((result) => {
          console.log(`Executed ${command}: ${result}`);
        })
        .catch((error) => {
          console.error(`Failed to execute ${command}: ${error}`);
        });
    }
    return `Finished executing (${program.commands.length}) commands`;
  } catch (error) {
    console.error(error);
    return `Failed to install and configure ${program.name}`;
  }
};

const main = async (commands) => {
  if (commands) {
    for (const command of commands) {
      console.log(await execCommand(command));
    }
  } else {
    for (const program of programs) {
      console.log(await checkAndInstall(program));
    }
  }
};

// Run the main function with the arguments
// process.argv[0] is the path to the Node.js executable.
// process.argv[1] is the path to the JavaScript file being executed.
// process.argv[2] and onwards are the additional command-line arguments.

main(process.argv.slice(2));
