import React, { useEffect, useState, useContext, createContext } from 'react';
import { get_utilisateur } from '../dataBase/apiCalls';
import { URLS } from '../dataBase/apiURLS';


export const UserContext = createContext();

export default function UserProvider({ children }) {



    const [user, setUser] = useState(null);


    useEffect(async () => {
        if (!user) {
            let userID;
            const utilisateur = localStorage.getItem('user');
            if (utilisateur) {
                userID = JSON.parse(utilisateur).value;
            }
            if (userID) {
                let fetched_user;
                try {
                    fetched_user = await get_utilisateur(userID);
                    setUser(fetched_user);
                } catch (err) {
                    throw err;
                }
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
