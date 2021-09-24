require("colors");

const mostrarMenu = () => {
  return new Promise((res) => {
    console.clear();
    console.log("======================".green);
    console.log("    Pick an option".green);
    console.log("======================\n".green);

    console.log(`${"1.".green} Create an item`);
    console.log(`${"2.".green} List items`);
    console.log(`${"3.".green} List completed items`);
    console.log(`${"4.".green} List pending items`);
    console.log(`${"5.".green} Complete items`);
    console.log(`${"6.".green} Delete an item`);
    console.log(`${"0.".green} Exit\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Pick an option: ", (opt) => {
      readline.close();
      res(opt);
    });
  });
};

const pausa = () => {
  return new Promise((res) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Press ${"ENTER".green} to continue.`, (opt) => {
      readline.close();
      res();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
