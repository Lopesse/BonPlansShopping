import { URLS } from "./apiURLS";

export function get_annonces(idUser) {
    const action = URLS.annonces + (idUser ? `?idUser=${idUser}` : '');
    return fetch(action)
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function get_annonce(idAnnonce) {
    return fetch(`${URLS.annonce}?id=${idAnnonce}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function delete_annonce(idAnnonce) {
    return fetch(URLS.delete_annonce, {
        method: "POST",
        body: JSON.stringify({ id: idAnnonce }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function create_annonce(data) {
    const fd = new FormData();
    for (let d in data) {
        fd.append(d, data[d]);
    }
    console.log(fd);

    return fetch(URLS.creer_annonce, {
        method: "POST",
        body: fd,
    })
        .then(res => {
            if (!res.ok) {
                throw Error('Annonce non crée');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function update_annonce(data) {
    return fetch(URLS.update_annonce, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw Error("Annonce n'a pas put être mis à jour");
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}



export function get_categories() {
    return fetch(URLS.categories)
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}

export function get_sous_categories() {
    return fetch(URLS.sous_categories)
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}



export function get_utilisateur(idUser) {
    return fetch(`${URLS.get_utilisateur}?id=${idUser}`)
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function delete_utilisateur(idUser) {
    return fetch(URLS.delete_utilisateur, {
        method: "POST",
        body: JSON.stringify({ id: idUser }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function update_utilisateur(data) {
    return fetch(URLS.update_utilisateur, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function create_utilisateur(data) {
    return fetch(URLS.inscription, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw Error('Utilisateur non crée');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}



export function connexion(identifiants) {
    return fetch(`${URLS.connexion}?identifiant=${identifiants.login}&mdp=${identifiants.mdp}`)
        .then(res => {
            if (!res.ok) {
                throw Error('Erreur de connexion');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function suivre_categorie(data) {
    return fetch(URLS.suivre_categorie, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw Error('Erreur');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}


export function enregistrer_annonce(data) {
    return fetch(URLS.enregistrer_annonce, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw Error('Erreur');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}

export function get_annonces_enregistres(data) {
    return fetch(URLS.get_annonces_enregistres, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw Error('Erreur');
            }
            return res.json();
        })
        .then(json => json)
        .catch(err => {
            throw err
        });
}