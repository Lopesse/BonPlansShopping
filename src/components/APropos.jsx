import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { URLS } from '../dataBase/apiURLS';
import './css/aPropos.css';


export default function APropos(props) {
    return (
        <>
            <div className='aPropos'>
                <div>
                    <h3>A propos de ce projet</h3>
                                        <div>Ce projet a été réalisé durant notre 3ème année de licence d’informatique, dernière année de notre diplôme, 
                        du mois de décembre 2021 à mars 2022,  dans le cadre du module “Projet Annuel”. Le principe de ce module était de choisir 
                        un sujet de projet parmi une liste de sujets proposés par les enseignants d’informatique de l’Université et de le 
                        réaliser en autonomie avec l’encadrant-enseignant l’ayant proposé. 
                    </div>
                    <div>Nous avons choisi pour ce projet le sujet “Bons plans shopping”, encadré par notre professeur Jean-Marc Lecarpentier, 
                        dont voici l’énoncé :
                    </div>
                    <div className="sujet">
                    “Prêt(e) pour faire votre shopping, les soldes, dénicher les meilleures affaires ?    
                    L'idée de cette application est de partager les bons plans shopping en temps "presque réel". 
                    Par exemple, je suis à Noz et il y a une super affaire sur le produit XYZ. Je poste un message pour partager cette affaire. 
                    Dans l'instant qui suit, les abonnés au site qui suivent mon profil ou bien ont indiqué dans leur profil que ce type de produit 
                    les intéresse reçoivent une notification pour cette bonne affaire.”
                    </div>
                </div>
            </div>
        </>
    );
}