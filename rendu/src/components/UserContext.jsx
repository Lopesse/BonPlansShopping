import React, { useEffect, useState, useContext, createContext } from 'react';
import { get_utilisateur } from '../dataBase/apiCalls';


export const UserContext = createContext();

export default function UserProvider({ children }) {


    const [user, setUser] = useState(null);

    const [userCached, setUserCached] = useState(false);


    useEffect(async () => {
        if (!user) {
            let userID;
            const utilisateur = localStorage.getItem('user');
            if (utilisateur) {
                userID = JSON.parse(utilisateur).value;
            }
            if (userID) {
                setUserCached(true)
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
        
            userCached ?
            (user && 
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>) :

            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>

    );
}
