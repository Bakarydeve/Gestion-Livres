import React from 'react'
import axios from 'axios'

class EnregistrerLivre extends React.Component {

  state = {
    livre: {
      titre: "",
      auteur: "",
      annee: "",
    },
    message : "",
  }
  
  constructor(props) {
    super(props)

    this.enregistrer = 
      this.enregistrer.bind(this);
    this.handleChange = 
      this.handleChange.bind(this);
  }

  enregistrer() {
    console.log("enregistrer")
    console.log("livre = " + JSON.stringify(this.state.livre))
    axios({
      method: "post",
      url: '/enregistrer_livre',
      //headers: { 'Content-Type': 'application/json' },
      data: this.state.livre,
    }).then(res => {
        // Affichage du message et rafraîchissement de la page après 1 seconde
        this.setState({ message: "Livre enregistré avec succès !" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }).catch(error => {
        console.error("Erreur lors de l'enregistrement du livre :", error);
        // Gestion des erreurs si nécessaire
      });
  }

  handleChange(event) {
    console.log("handleChange")
    // immutable data
    this.setState({
      livre: {
        ...this.state.livre,
        [event.target.name]: event.target.value
      }
    });
  }

  render() {
    return (
      <div>
        <h2>Enregistrement d'un livre</h2>
        <table><tbody>
        {this.state.message && <p>{this.state.message}</p>} {/* Affichage du message */}
          <tr>
            <td>Titre</td>
            <td><input type="text" name="titre" value={this.state.livre.titre} onChange={this.handleChange} /></td>
          </tr>
          <tr>
            <td>Auteur</td>
            <td><input type="text" name="auteur" value={this.state.livre.auteur} onChange={this.handleChange} /></td>
          </tr>
          <tr>
            <td>Année</td>
            <td><input type="text" name="annee" value={this.state.livre.annee} onChange={this.handleChange} /></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><button className="btn btn-success start" onClick={this.enregistrer} >Enregistrer</button></td>
          </tr>
        </tbody></table>
      </div>
    )
  }
}


export default EnregistrerLivre
