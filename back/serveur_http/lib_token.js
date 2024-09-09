
const jwt = require("jsonwebtoken")

const private_key = require("./config.js").private_key

function creer(obj) {

    let token = jwt.sign({
        data: obj,
    }, private_key, { expiresIn: 60 * 60 }) // 1h

    return token
}

function extraire_token_header(req) {
    console.log("lib_token.extraire_token_header")
    console.log("req.headers.authorization = "+req.headers.authorization)
 
    let token = null

   const authHeader = req.headers.authorization

    if (authHeader) {
        let items = authHeader.split(' ')
        if (items.length == 2) {
            if (items[0] == "Bearer") {
                token = items[1]
                console.log("Bearer token trouvé dans header")
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

    return token

}

function verifier(req) {
    console.log("lib_token.verifier")

    let token = extraire_token_header(req)
    if (token == null) {
        return null
    }

    let decoded = null

       try {
            decoded = jwt.verify(token, private_key)

            console.log("objet trouvé dans le token")
            console.log("obj = "+JSON.stringify(decoded.data))

            let ident = decoded.data.ident
            let role = decoded.data.role

 
            let duree = (decoded.exp * 1000) - Date.now()
            console.log("durée de validité en mn = "+Math.round((duree/60000)))


        } catch (e) {
            console.log("Erreur lib_token.verifier " + e)
        }
 
        return decoded
}

module.exports = {
    creer: creer,
    verifier: verifier,
}