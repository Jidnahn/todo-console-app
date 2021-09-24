const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "option",
    message: "What will you do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create item`,
      },
      {
        value: "2",
        name: `${"2.".green} List items`,
      },
      {
        value: "3",
        name: `${"3.".green} List completed items`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending items`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete item(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete items`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

const pauseMenu = [
  {
    type: "input",
    name: "pause",
    message: `Press ${"ENTER".green} to continue`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======================".green);
  console.log("    Pick an option".white);
  console.log("======================\n".green);

  const { option } = await inquirer.prompt(menuOpts);

  return option;
};

const pausa = async () => {
  console.log("\n");
  const cont = await inquirer.prompt(pauseMenu);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please input a description";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: 0,
    name: "0.".green + " Cancel",
  });

  // console.log(choices);

  const preguntas = [{ type: "list", name: "id", message: "Delete", choices }];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const question = {
    type: "confirm",
    name: "ok",
    message,
  };
  const { ok } = await inquirer.prompt(question);

  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    { type: "checkbox", name: "ids", message: "Select", choices },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  confirmar,
};
