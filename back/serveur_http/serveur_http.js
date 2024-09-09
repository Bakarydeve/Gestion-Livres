const express = require('express') // chargement du module express
const util = require('util') // chargement du module util
const config = require("./config2.js") // chargement de la configuration
const livre = require('./livre')
const validation = require("./validation.js")
const lib_token = require("./lib_token.js")
//const bd = require("./mysql.js")
const bd2 = require("./mysql2.js")

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const fs = require("fs")

const base = config.base
const port_http = config.port_http

var app = express();
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static(base+"/html", { index: 'index.html' }))
app.use(express.json({ limit: '50mb' }))

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

var server = app.listen(port_http, function () {
    console.log('Express server listening on port ' + port_http)
    console.log("test swagger : http://localhost:3000/api-docs/");
});

app.post("/enregistrer_livre", async function (req, res) {
    console.log("POST enregistrer_livre")

    let auth = false
    let token_decode = lib_token.verifier(req)
    console.log("token_decode = " + JSON.stringify(token_decode))
    if (token_decode != null) {
        if (token_decode.data.role == "admin") {
            auth = true
            console.log("role admin trouvé")
        }
    }
    if (auth) {
            //console.log("req = "+util.inspect(req.body))
    console.log("titre = "+req.body.titre)
    console.log("auteur = "+req.body.auteur)
    console.log("annee = "+req.body.annee)

    fs.writeFileSync("req.txt",util.inspect(req),{encoding : "utf8"})
    
    let l = new livre.Livre(req.body)

    let mess = "Objet livre créé : " + JSON.stringify(l)

    let v = validation.valider_attributs
        (l, livre.donnees_validation)


        if (v.res) {
            mess += "<br>La validation des champs a été effectuée avec succès"
            mess += "<br>Livre à enregistrer en BD : "
            mess += `<br>Titre = ${l.titre}`
            mess += `<br>Auteur = ${l.auteur}`
            mess += `<br>Année = ${l.annee}`

            new Promise((resolve, reject) => {
                bd2.enregistrerLivre(l)
            })
            .then((data) => {
                console.log("insert terminé res= "+JSON.stringify(data))
            
            })
            .catch((err) => {
                console.log("catch insert : " +err)
            })
    
         }
        else {
            mess += "<br>Echec validation"
        }
    
        res.send({res : v.res, mess, lerr : v.lmess})
    }

    /*

        */
     
    })

    app.post("/listerLivres", function (req, res) {
        console.log("POST lister_livres")

        bd2.listerLivres()
        .then(livres => {
            //console.log("test bre ", livres);

            // Répondez avec les données des livres au format JSON
            res.json({ livres });
        })
        .catch(error => {
            // En cas d'erreur, renvoyez une réponse d'erreur avec le code d'état 500
            console.error("Erreur lors de la récupération de la liste des livres :", error);
            res.status(500).json({ error: "Erreur lors de la récupération de la liste des livres" });
        });
      
    })

    app.post("/supprimer_Livre", function (req, res) {
        console.log("POST supprimer_Livre")

        console.log("Livre a supprimer "+req.body.titre)

        bd2.supprimerLivre(req.body)
        .then(result => {
        console.log("Livre supprimé :", result);

        // Répondez avec les données de la suppression au format JSON
        res.json(result);
        })
        .catch(error => {
        // En cas d'erreur, renvoyez une réponse d'erreur avec le code d'état 500
        console.error("Erreur lors de la suppression du livre :", error);
        res.status(500).json({ error: "Erreur lors de la suppression du livre" });
        });
      
    })

    app.post("/identification", function (req, res) {
        console.log("POST Identification")

        console.log("Identifiant "+req.body.ident)

        if(req.body.ident === "ubo" && req.body.mdp === "ubo")  
        {
            console.log("successsss")
            const jwt = require('jsonwebtoken')

            const private_key = "zjerYhe+7V"

            let ident = "ubo"
            let role = "admin"

            let token = jwt.sign({
                data: {
                    ident: ident,
                    role: role,
                }
            }, private_key, { expiresIn: 60 * 60 }); // 60 minutes
            console.log("token = " + token)
            res.send({ res: true, token : token })
        }  else {
            res.send({ res: false})
            console.log("repeatttttt")
        }
      
    })

    