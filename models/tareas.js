const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    const tareas = this.listadoArr;

    tareas.forEach((tarea, i) => {
      tarea.completadoEn
        ? console.log(`${`${i + 1}.`.green} ${tarea.desc} :: ${"Done".green}`)
        : console.log(`${`${i + 1}.`.green} ${tarea.desc} :: ${"Pending".red}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let counter = 1;
    this.listadoArr.forEach((tarea) => {
      if (completadas) {
        if (tarea.completadoEn) {
          console.log(
            `${counter.toString()}.`.green,
            tarea.desc,
            `:: ${tarea.completadoEn.toString().green}`
          );
          counter++;
        }
      } else {
        if (!tarea.completadoEn) {
          console.log(
            `${counter.toString()}.`.green,
            tarea.desc,
            `:: ${"Pending".red}`
          );
          counter++;
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
