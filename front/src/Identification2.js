import React, { useState, useEffect } from "react";
import axios from 'axios'

// utilisation d'un hook oo
export default function Identification2() {

    const [conn, setConn] = useState({
        ident: "ubo",
        mdp: "ubo",
      })

      const [mess, setMess] = useState(null)

      // refresh front import

      function handleChange(e) {
        setConn({
          ...conn,
          [e.target.name]: e.target.value,
        })
      }

      async function valider() {
        axios.post(
            '/identification',
            conn,
          ).then(data => {
            let token = data.data.token
            console.log("token = "+
                JSON.stringify(token))
                sessionStorage.setItem("token",token)
                setMess("token = "+token)
           })
          

          
      }

    return(
        <div>

        <h2>Identification</h2>
  
        <table><tbody>
          <tr>
            <td>Identifiant</td>
            <td><input type="text" name="ident"
              value={conn.ident} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>Mot de passe</td>
            <td><input type="password" name="mdp"
              value={conn.mdp} onChange={handleChange} /></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><button className="btn btn-success start" onClick={valider} >Valider</button></td>
          </tr>
        </tbody></table>
  
  
        <br />
  
        <div>{mess}</div>

        <br />
        <br />
  
      </div>
  
    )
}

