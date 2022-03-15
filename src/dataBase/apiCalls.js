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
    return fetch(URLS.creer_annonce, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
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
