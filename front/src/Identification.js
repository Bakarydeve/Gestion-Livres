import React, { useState} from "react";
import axios from 'axios'

export default function Identification () {

    const [ident, setIdent] = useState("");
    const [mdp, setMdp] = useState("");
    const [message, setMessage] = useState("");

    const identifier = () => {
        console.log("identifier");
        console.log("ident = " + JSON.stringify(ident) + " mdp = " + JSON.stringify(mdp));

        axios({
          method: "post",
          url: '/identification',
          headers: { 'Content-Type': 'application/json' },
          data: { ident, mdp }
        }).then(res => {
            // Here you should handle the response accordingly, for now, we'll just log it
            //console.log("Response from server:", res.data.JSON);
            console.log("Response from server:", res.data)
            // You may want to set a message based on the response
            let token = res.data.token
            sessionStorage.setItem("token",token)
            console.log("token:", sessionStorage.getItem("token"))
            setMessage("succèssssful !");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }).catch(error => {
            console.error("Error while identifying:", error);
            // Set an error message here if needed
            setMessage("Error while identifying. Please try again."); // Example message
        });
        
      }

      const handleChange = (event) => {
        console.log("handleChange");
        const { name, value } = event.target;
        if (name === "ident") {
            setIdent(value);
        } else if (name === "mdp") {
            setMdp(value);
        }
    }

      return (
        <div>
          <h2>Identification ( Hook )</h2>
          <table>
            <tbody>
            {message && <p>{message}</p>} {/* Affichage du message */}
              <tr>
                <td>Identifiant</td>
                <td><input type="text" name="ident" value={ident} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>Mot de passe</td>
                <td><input type="passwd" name="mdp" value={mdp} onChange={handleChange} /></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td><button className="btn btn-success start" onClick={identifier}>Connexion</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      );


}


