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
                annonces ?
                    <div>
                        Vos annonces enregistrés
                        {
                            annonces.map(a =>
                                <Annonce annonce={a} key={a.id} />
                            )
                        }
                    </div>
                    :
                    <div>Vous n'avez pas d'annonces enregistrés</div>
            }
        </div>
    )
}
