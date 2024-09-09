import React, { useState} from "react";
import axios from 'axios'

export default function EnregistrerLivreHook () {

    const [livre, setLivre] = useState({
        titre: "",
        auteur: "",
        annee: "",
    });
    const [message, setMessage] = useState("");

    const enregistrer = () => {
        console.log("enregistrer");
        console.log("livre = " + JSON.stringify(livre));
        axios({
          method: "post",
          url: '/enregistrer_livre',
          //headers: { 'Content-Type': 'application/json' },
          data: livre,
        }).then(res => {
          // Affichage du message et rafraîchissement de la page après 1 seconde
          setMessage("Livre enregistré avec succès !");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }).catch(error => {
          console.error("Erreur lors de l'enregistrement du livre :", error);
          // Gestion des erreurs si nécessaire
        });
      }

      const handleChange = (event) => {
        console.log("handleChange");
        // immutable data
        setLivre({
          ...livre,
          [event.target.name]: event.target.value
        });
      }

      return (
        <div>
          <h2>Enregistrement d'un livre ( Hook )</h2>
          <table>
            <tbody>
              {message && <p>{message}</p>} 
              <tr>
                <td>Titre</td>
                <td><input type="text" name="titre" value={livre.titre} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Auteur</td>
                <td><input type="text" name="auteur" value={livre.auteur} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Année</td>
                <td><input type="text" name="annee" value={livre.annee} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td><button className="btn btn-success start" onClick={enregistrer}>Enregistrer</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      );


}
