const readline = require("readline");

const readLineAsync = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  return new Promise((resolve) => {
    console.log(prompt);
    rl.prompt();
    rl.on("line", (line) => {
      rl.close();
      resolve(line);
    });
  });
};

module.exports = readLineAsync