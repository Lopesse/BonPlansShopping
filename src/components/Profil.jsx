import { useContext } from "react";
import UserProvider, { UserContext } from "./UserContext";

export default function Profil() {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            {
                user &&
                <div>{user.pseudo}</div>
            }
        </>
    );
}