import React from 'react'
import axios from 'axios'

class ListerLivres2 extends React.Component {

  state = {
    livres : [],
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    axios({
    method : "post",
    url : '/listerLivres'
    }).then(res => {
    console.log(JSON.stringify(res.data))
    this.setState({ livres: res.data.livres });
  })

  }


  render() {

    return (
      <div>
        <h2>Liste des livres</h2>

        <table className="table table-bordered table-warning">
          <thead>
            <tr><th>Titre</th><th>Auteur</th><th>Année</th></tr>
          </thead>

          <tbody>
            {this.state.livres.map(function (livre, idx) {
              return (
                <tr key={idx}>
                  <td>{livre.titre}</td>
                  <td>{livre.auteur}</td>
                  <td>{livre.annee}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    )
  }
}
export default ListerLivres2
