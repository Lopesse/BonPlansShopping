import { useContext, useEffect, useState } from "react";
import { get_abonnements } from "../dataBase/apiCalls";
import Annonce from "./Annonce";
import { UserContext } from "./UserContext";

export default function AnnoncesAbonnements() {
  const [annonces, setAnnonces] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(async () => {
    let annoncesAbo;
    if (user) {

      try {
        annoncesAbo = await get_abonnements(user.id);
        if(annoncesAbo){
          setAnnonces(annoncesAbo);
          console.log(annoncesAbo);
        }
      } catch (err) {
        throw err;
      }
    }
  }, [])

  return (
    <div>
      {
        (annonces.length > 0) ?
        <div style={{margin: 50}}>
            <div>Vos abonnements :</div><hr style={{marginBottom: 15}} />
            <div>
                {
                annonces.map(a =>
                    <Annonce annonce={a} key={a.id} />
                )
                }
            </div>
        </div>
        :
        <div style={{margin: 50}}>Désolé, nous n'avons pas d'annonce(s) correspondante(s) à vos abonnnement pour le moment... </div>
    }
    </div>
  )
}