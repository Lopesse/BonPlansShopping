import React, { useEffect, useState, useContext, createContext } from 'react';
import { URLS } from '../dataBase/apiURLS';


export const UserContext = createContext();

export default function UserProvider({ children }) {



    const [user, setUser] = useState(null);


    useEffect(() => {
        let isMounted = true;
        let userID = JSON.parse(localStorage.getItem('user')).value;

        if (userID) {
            fetch(`${URLS.get_utilisateur}?id=${userID}`)
                .then(res => res.json())
                .then(json => {
                    if (json != -1)
                        if (isMounted) setUser(json)
                })
                .catch(e => console.log(e))
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}