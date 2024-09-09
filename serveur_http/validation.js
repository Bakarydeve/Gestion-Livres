function init_attributs(obj,http) { // initialisation des attributs d'un objet
        console.log("init_attributs")
        // on va intialiser obj à partir de http en vérifiant
        // que l'initialisation est possible
        
        // pour chaque attribut (propriété) de obj
        // verifier si l'attribut correspondant existe dans http et que c'est une chaîne de type string
        // si oui initialiser l'attribut de obj à partir de l'attribut de http
        // si non initialiser l'attribut de obj à chaîne vide et afficher un message d'avertissement
        
        // pour obtenir la liste des attributs de obj
        // utiliser Object.keys(obj)
        
        // pour vérifier qu'un attribut de http existe
        // utiliser (typeof obj[attr] === 'undefined') dans un if
        
        // pour vérifier qu'un attribut de http est de type string
        // utiliser (typeof obj[attr] !== 'string') dans un if
        
        // noter que dans le test on utilise === et !==
        // et non pas == et !=
        // pour tester à la fois le type et la valeur
        
        // exemple d'accès à l'attribut 'at' d'un objet obj
        // let attr = 'at'
        // obj[attr] = "nouvelle valeur"
        
        // quand l'exécution de init_attributs est terminée
        // tous les attributs de obj (objet Livre dans notre exemple)
        // ont été initialisés avec des chaînes de caractères
        // on vérifiera les valeurs plus tard
        
        // toutes les vérifications restant à faire
        // seront des vérifications sur des attributs initialisés de type chaîne (string)
            Object.keys(obj).forEach(attr => { 
                console.log("attr = "+attr + "val = "+http[attr])


                if(typeof http[attr] === 'undefined')   {
                    console.log("Warning Livre : le champ " + attr +"= "+http[attr])
                }
                else if(typeof http[attr] !== 'string')  {
                    console.log("Warning Livre : le champs " + attr +"= "+http[attr])
                }
                else{
                    obj[attr] = http[attr]
                    // obj[attr] = http[attr].trim()
                    // supprime les espaces 
                }
            })

        
        }

        function valider_attributs(obj,donnees_validation) {
            let res = true
            let lmess = []
            
            // à compléter
            donnees_validation.forEach(v => {
                let f = v.field
                let r = new RegExp(v.regexp)
                let m = v.mess
                if(("" + obj[f]).match(r))  {
                    console.log("match " + obj[f] + " " + r)
                }
                else{
                    res = false
                    lmess.push({ field: f, mess: m })
                    console.log("nomatch " + obj[f] + " " + r)
                }
            })
            
            return ({res : res , lmess : lmess})
            }
        
        module.exports = {
            init_attributs : init_attributs,
            valider_attributs : valider_attributs,
        }
        
