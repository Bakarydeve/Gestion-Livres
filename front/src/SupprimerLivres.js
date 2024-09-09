import React from 'react';
import axios from 'axios';

class SupprimerLivres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      livres: []
    };
  }

  componentDidMount() {
    this.listerLivres();
  }

  listerLivres() {
    axios.post('/listerLivres')
      .then(res => {
        this.setState({ livres: res.data.livres });
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la liste des livres :", error);
      });
  }

  supprimerLivre(titre) {
    axios.post('/supprimer_Livre', { titre: titre })
      .then(res => {
        if (res.data.result ) {
          alert("Livre supprimé avec succès !");
          console.log("yess supp ouiii")
            this.listerLivres();
            window.location.reload(); 
        } else {
          alert("Erreur lors de la suppression du livre.");
        }
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du livre :", error);
        alert("Erreur lors de la suppression du livre.");
      });
  }

  render() {
    return (
      <div>
        <h2>Suppression Livres</h2>
        <table className="table table-bordered table-warning">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Année</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.livres.map((livre, idx) => (
              <tr key={idx}>
                <td>{livre.titre}</td>
                <td>{livre.auteur}</td>
                <td>{livre.annee}</td>
                <td>
                <button className="btn btn-danger" onClick={() => this.supprimerLivre(livre.titre)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SupprimerLivres;