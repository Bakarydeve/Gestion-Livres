const fs = require('fs');
const path = require('path');

function lister_fichiers() {

  const directoryPath = path.join(__dirname);

  console.log('for classique (langage C) : ');
  try {
    const files1 = fs.readdirSync(directoryPath);
    for (let i = 0; i < files1.length; i++) {
        console.log(files1[i]);
    }
  } catch (error) {
    console.error(error.message);
  }
  

}

module.exports = lister_fichiers;