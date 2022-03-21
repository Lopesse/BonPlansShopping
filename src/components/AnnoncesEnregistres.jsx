import { useContext, useEffect, useState } from "react";
import { get_annonces_enregistres } from "../dataBase/apiCalls";
import Annonce from "./Annonce";
import { UserContext } from "./UserContext";

export default function AnnoncesEnregistres() {
    const [annonces, setAnnonces] = useState([]);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        let isMounted = true;
        let enregistres;
        async function fetchData() {

            if (user && user.annoncesEnregistres && isMounted) {
                try {
                    enregistres = await get_annonces_enregistres(user.id);
                    setAnnonces(enregistres);
                } catch (err) {
                    throw err;
                }
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            {
                (annonces.length > 0) ?
                <div style={{margin: 50}}>
                    <div>Vos annonces enregistrés</div><hr style={{marginBottom: 15}}/>
                    <div>
                        {
                        annonces.map(a =>
                            <Annonce annonce={a} key={a.id} />
                        )
                        }
                    </div>
                </div>
                :
                <div style={{margin: 50}}>Vous n'avez pas d'annonce(s) enregistrée(s) pour le moment... </div>
            }
        </div>
    )
}