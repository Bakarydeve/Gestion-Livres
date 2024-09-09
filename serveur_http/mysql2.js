
const mysql2 = require('mysql2/promise')

const config_mysql2 = require('./config2.js').mysql2

const livre = require('./livre')

const pool = mysql2.createPool(config_mysql2)
console.log("pool ouvert")

async function enregistrer_livre
        (obj,resolve, reject) {
    console.log("bd.enregistrer_livre")

    let sql = "insert into t_livre (titre, auteur, annee) values "
    sql += `('${obj.titre}', '${obj.auteur}', ${obj.annee})`
    console.log("sql = "+sql)

    try {
        resolve({res : true})
        pool.end()
        console.log("pool fermé")   
    }
    catch (err) {
        resolve({res : false , mess : err})
        pool.end()
        console.log("pool fermé")  
    }
}

async function lister_livre
        (obj,resolve, reject) {
    console.log("bd.lister_livre")

    //let sql = "insert into t_livre ..."
    var req = "select * from livre"
    console.log("sql = "+req)

    try {
        resolve({res : req})
        pool.end()
        console.log("pool fermé") 
    }
    catch (err) {
        resolve({res : false , mess : err})
        pool.end()
        console.log("pool fermé") 
    }
}

async function listerLivres()   {
    return new Promise(async (resolve, reject) => {
        const pool = mysql2.createPool(config_mysql2)
        console.log("pool ouvert") 
        
        let sql = "select * from t_livre"
        
        try {
            const [livres] = await pool.execute(sql)

            resolve(livres)
            /*
            livres.forEach((l) => {
                console.log(`id = ${l.id} titre = ${l.titre} auteur = ${l.auteur} année = ${l.annee}`)
                })
            */  
                pool.end()

                //console.log(livres)
                console.log("pool fermé")

        }
        catch (err) {
        reject(err)
        }
    }) 

     
}

async function test() {
    try {
    let livres = await listerLivres()
    console.log("Liste des livres :")
    livres.forEach((l) => {
    console.log(`id = ${l.id} titre = ${l.titre} auteur = ${l.auteur} année = ${l.annee}`)
    })
    
    pool.end()
    console.log("pool fermé")
    
    }
    catch (err) {
    console.log("Erreur " + err)
    
    }
}

async function enregistrerLivre(livre)  {
    return new Promise(async (resolve, reject) => {
        const pool = mysql2.createPool(config_mysql2)
        console.log("pool ouvert") 
        
        let sql = "insert into t_livre (titre, auteur, annee) values "
        sql += `('${livre.titre}', '${livre.auteur}', ${livre.annee})`
        console.log("sql = "+sql)

        const values = [livre.titre, livre.auteur, livre.annee]
        
        try {
            const [result] = await pool.execute(sql, values)
            const nouvelId = result.insertId;
            

            resolve({ id: nouvelId, titre: livre.titre })
                
                pool.end()
                console.log("pool fermé")

        }
        catch (err) {
        reject(err)
        }
    }) .then((data) => {
        console.log("insert terminé res= "+JSON.stringify(data))
    
    })
    .catch((err) => {
        console.log("catch insert : " +err)
    })

}

async function test2() {
    try {
    let l = {auteur : "alou", titre : "life", annee : 2024}
    const { id, titre } = await enregistrerLivre(l);
    console.log("Livre enregistré : ID =", id, ", Titre =", titre);

    
    pool.end()
    console.log("pool fermé")
    
    }
    catch (err) {
    console.log("Erreur " + err)
    
    }
}


async function supprimerLivre(livre) {
    return new Promise(async (resolve, reject) => {
    const pool = mysql2.createPool(config_mysql2);
    console.log("pool ouvert");

    const sql = "DELETE FROM t_livre WHERE titre = ?";
    console.log("sql = " + sql);

    try {
        const [result] = await pool.execute(sql, [livre.titre]);
        pool.end();
        console.log("pool fermé");
        console.log("delete terminé, lignes affectées: " + result.affectedRows);
        return { ret: true };
    } catch (err) {
        console.log("Erreur lors de la suppression du livre : " + err);
        throw err; // Propager l'erreur pour que le code appelant puisse la gérer
    }
    }) .then((data) => {
    console.log("delete terminé res= "+JSON.stringify(data))

    })
    .catch((err) => {
    console.log("catch delete : " +err)
    })
}

async function test3() {
    try {
    let l = {auteur : "alou", titre : "ttt", annee : 2024}
    const { ret } = await supprimerLivre(l);
    console.log("Livre delete ret : ", ret);

    
    pool.end()
    console.log("pool fermé")
    
    }
    catch (err) {
    console.log("Erreur " + err)
    
    }
}



module.exports = {
    enregistrerLivre : enregistrerLivre,
    enregistrer_livre : enregistrer_livre,
    listerLivres : listerLivres,
    supprimerLivre : supprimerLivre
}