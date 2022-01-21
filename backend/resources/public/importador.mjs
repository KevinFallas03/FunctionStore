// References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// https://stackoverflow.com/questions/7650071/is-there-a-way-to-create-a-function-from-a-string-with-javascript/7650148

const url = "http://localhost:3000/api/functions/";

export function importar(...params) {
  const importer = new importador();
  return new Promise((resolve, reject) => {
    importer
      .importar(...params)
      .then(resolve(importer))
      .catch(reject(importer));
  });
}

export class importador {
  // * Param struture: ...{nombre: id} *
  importar(...params) {
    const fetchArray = [];
    params.forEach((param) => {
      Object.keys(param).forEach((nombre) => {
        fetchArray.push(
          fetch(url + param[nombre])
            .then((res) => res.json())
            .then((parsedRes) => new Function("return " + parsedRes.js_code)())
            .then((foo) => {
              this[nombre] = foo;
            })
            .catch((e) => {
              console.error("Error Importing Function: \n", e);
            })
        );
      });
    });
    return Promise.all(fetchArray);
  }
}
