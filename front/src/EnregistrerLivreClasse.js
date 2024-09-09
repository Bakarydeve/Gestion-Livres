
import React, { Component } from 'react';
import axios from 'axios'

export default class EnregistrerLivre extends React.Component {

    // objet livre à définir dans state
    // lecture par this.state.livre
    // écriture par this.setState( ... )
    state = {
        livre: {
            titre: "ttttt",
            auteur: "aaaaa",
            annee: 2024,
        },
        result : null
    }

    constructor(props) {
        super(props)

        // association fonction handleChange à l'objet EnregistrerLivre (this)
        this.handleChange = this.handleChange.bind(this);

        // association fonction enregistrer à l'objet EnregistrerLivre (this)
        this.enregistrer = this.enregistrer.bind(this);

    }

    enregistrer() {
        console.log("enregistrer " + JSON.stringify(this.state.livre))
        // envoi d'une requête HTTP vers serveur "back"

        // npm install axios

        axios({
            method: "post",
            url: '/enregistrer_livre',
            data: this.state.livre,
        }).then(data => {
            this.setState({
                result : JSON.stringify(data)
            })
        })

    }

    handleChange(event) {
        console.log("handleChange " +
            event.target.name + " : " + event.target.value)
        this.setState({
            livre: {
                ...this.state.livre,
                // on reprend l'ancien objet livre
                [event.target.name]: event.target.value
                // on redéfinit un des attributs de livre
            }
        })
        console.log("livre = " + JSON.stringify(this.state.livre))
        // attention, ce console.log est exécuté avant le setState
    }

    render() {
        return (
            <div>
                <h1>Enregistrement d'un livre</h1>
                <table>
                   <tbody>
                        <tr>
                            <td>Titre : </td>
                            <td><input type="text" name="titre" value={this.state.livre.titre} 
                                onChange={this.handleChange}/></td>
                       </tr>
                        <tr>
                            <td>Auteur : </td>
                            <td><input type="text" name="auteur" value={this.state.livre.auteur}
                                onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td>Année : </td>
                            <td><input type="text" name="annee" value={this.state.livre.annee} 
                                onChange={this.handleChange} /></td>
                       </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td><button onClick={this.enregistrer}>Enregistrer</button></td>
                        </tr>
                   </tbody>
                </table>
                <div>{this.state.result}</div>


            </div>
        )
    }
}