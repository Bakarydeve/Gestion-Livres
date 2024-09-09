import React, { useState, useEffect } from "react";
import axios from 'axios'

// utilisation d'un hook
export default function EnregistrerLivreHook2() {

  const [livre, setLivre] = useState({
    titre: "titre hook",
    auteur: "auteur hook",
    annee: 2024,
  })
  // creation variable persistante + accesseur

  const [mess,setMess] = useState(null)

  function handleChange(e) {
    setLivre({
      ...livre,
      [e.target.name]: e.target.value,
    })
  }

  async function enregistrer() {
    // e.preventDefault() // si utilisation de la balise form
    console.log("enregistrer")
    console.log("livre = " + JSON.stringify(livre))

    let token = sessionStorage.getItem("token")

    console.log("le token = " + JSON.stringify(token))

    try {
      const head = {
        headers: {
          "Authorization": `Bearer ${token}` ,
          "Content-Type": "application/json",
          //"Content-Type": "application/x-www-form-urlencoded",
        },
      };
      //const body = JSON.stringify(livre);
      const res = await axios.post("/enregistrer_livre",
        livre, head);
      console.log("res = " + JSON.stringify(res))
      setMess(JSON.stringify(res))

    } catch (err) {
      console.log("erreur enregistrer : " + err.response.data);
      // à compléter
    }

  }
  return (
    <div>
      <h2>Enregistrement d'un livre - Hook</h2>

      <table><tbody>
        <tr>
          <td>Titre</td>
          <td><input type="text" name="titre"
            value={livre.titre} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Auteur</td>
          <td><input type="text" name="auteur" value={livre.auteur} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Année</td>
          <td><input type="text" name="annee"
            value={livre.annee} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td><button className="btn btn-success start" onClick={enregistrer} >Enregistrer</button></td>
        </tr>
      </tbody></table>


      <br />

      <div>{mess}</div>
    </div>)
}


