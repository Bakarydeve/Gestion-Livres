const validation = require("./validation.js")

class Livre {

titre = null
auteur = null
annee = null

constructor(obj) {
// obj est fourni dans une requête HTTP
// il faut vérifier que les attributs de obj correspondent aux
// attributs de Livre

// obj['auteur'] = 2
// obj.auteur = 2

validation.init_attributs(this,obj)

console.log("livre = "+JSON.stringify(this))

}

}

const donnees_validation = [
    {
    field : "titre",
    regexp : ".{2,}",
    mess : "Il faut au moins 2 caractères pour le titre",
    },
    {
    field : "auteur",
    regexp : ".{2,}",
    mess : "Il faut au moins 2 caractères pour l'auteur",
    },
    {
    field : "annee",
    regexp : "^[0-9]{4}$",
    mess : "L'année doit avoir 4 chiffres",
    },
    ]

module.exports = {
Livre: Livre,
donnees_validation : donnees_validation,
}