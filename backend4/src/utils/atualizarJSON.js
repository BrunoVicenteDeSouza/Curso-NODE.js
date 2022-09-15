const fs = require('fs');

function atualizarJSON(collection, nomeArquivo) {
    const json = JSON.stringify(collection);
    fs.writeFile(`./src/data/${nomeArquivo}`, json, 'utf-8', (err) => {
      if (err) {
        return console.error(err);
      }
    });
}

module.exports = atualizarJSON