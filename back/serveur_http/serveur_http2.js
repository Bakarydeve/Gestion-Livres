
const fs = require("fs")
const express = require('express') // chargement du module express
const util = require("util")
const jwt = require("jsonwebtoken")

let private_key = "snbrnr876+6("

const config = require("./config2.js") // chargement de la configuration


// version 1 module mysql
//const bd = require("./mysql/bd_mysql.js")

// version 2 module mysql2/promise
const bd = require("./mysql2.js")

const base = config.base
const port_http = config.port_http

var app = express();
//app.use("/", express.static(base + "/html", { index: 'index.html' }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))


app.post("/enregistrer_livre", async function (req, res) {
    console.log("POST enregistrer_livre " + JSON.stringify(req.body))

    let token = null

    const authHeader = req.headers.authorization

    if (authHeader) {
        let items = authHeader.split(' ')
        if (items.length == 2) {
            if (items[0] == "Bearer") {
                token = items[1]
                console.log("Bearer token trouvé dans header : " + token)
            }
            else {
                console.log("Bearer token non trouvé dans header")
            }
        }
        else {
            console.log("Bearer non trouvé dans header")
        }

    }
    else {
        console.log("pas de header authorization")
    }

    let decoded = null
    let ident = null
    let role = null
    let duree = null

    if (token != null) {
        try {
            decoded = jwt.verify(token, private_key)
            console.log("succès vérification token")
            console.log("objet trouvé dans le token = " + JSON.stringify(decoded.data))

            ident = decoded.data.ident
            role = decoded.data.role

            duree = (decoded.exp * 1000) - Date.now()
            console.log("durée de validité en mn = " + Math.round((duree / 60000)))


        } catch (e) {
            console.log("Erreur vérification token : " + e)
        }
    }


    if (role == null) {
        res.send({
            res: false,
            mess: "enregistrement impossible, droits insuffisants"
        })
    }
    else {

        // ajouter un try catch pour récupérer les erreurs
        let result = await bd.enregistrerLivre(req.body)

        console.log("result = " + JSON.stringify(result))
        res.send(result)
    }

})

app.post("/listerLivres", function (req, res) {
    console.log("POST lister_livres")

    bd.listerLivres()
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



app.post("/identification", function (req, res) {
    console.log("POST identification " + JSON.stringify(req.body))
    let ident = req.body.ident
    let mdp = req.body.mdp

    let obj = {
        ident: ident,
        role: "admin",
    }
    if ((ident == "ubo") && (mdp == "ubo")) {
        // succès identification
        let token = jwt.sign({
            data: obj,
        }, private_key, { expiresIn: 60 * 60 }) // 1h
        console.log("token = " + token)
        res.send({
            res: true,
            token: token,
            mess: "succès identification",
        })
    }
    else {
        // échec identification
    }
})



var server = app.listen(port_http, function () {
    console.log('Express server listening on port ' + port_http)
});
