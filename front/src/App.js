import Menu from "./Menu.js"
import EnregistrerLivre from "./EnregistrerLivre.js"
import ListerLivres from "./ListerLivres.js"
import SupprimerLivres from "./SupprimerLivres.js"
import EnregistrerLivreHook from "./EnregistrerLivreHook.js"
import Identification from "./Identification.js"


import EnregistrerLivreHook2 from './EnregistrerLivreHook2.js';


import Identification2 from './Identification2.js';

import ListerLivres2 from "./ListerLivres2.js"

export default function App() {
  return (
    <div className="App">
    <Menu />
    <EnregistrerLivreHook2 />
    <ListerLivres2 />
    <Identification2 />
  </div>

  )
  }