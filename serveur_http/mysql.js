const mysql = require('mysql')

var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "zoldyc2011",
	database: "livres",
	port: 3308
  });

var sql = "INSERT INTO t_livre (titre, auteur, annee) VALUES ('ttt','aaa',111)";

async function lister_livre
        (obj,resolve, reject) {
    console.log("bd.lister_livre")

    //let sql = "insert into t_livre ..."
    var req = "select * from livre"
    console.log("sql = "+req)

    try {
        resolve({res : req})
    }
    catch (err) {
        resolve({res : false , mess : err})
    }
}

async function enregistrer_livre
        (obj,resolve, reject) {
    console.log("bd.enregistrer_livres")

    //let sql = "insert into t_livre ..."
    let sql = "insert into t_livre (titre, auteur, annee) values "
    sql += `('${obj.titre}', '${obj.auteur}', ${obj.annee})`
    console.log("sql = "+sql)

    try {
        resolve({res : true})
    }
    catch (err) {
        resolve({res : false , mess : err})
    }
}

conn.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		conn.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Result: " + result);
			conn.end()
		});
}); 

module.exports = {
    enregistrer_livre: enregistrer_livre,
    lister_livre : lister_livre
    }