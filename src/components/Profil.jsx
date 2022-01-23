import { useContext } from "react";
import NavBar from "./NavBar";
import UserProvider, { UserContext } from "./UserContext";

export default function Profil() {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
            <NavBar />
            {
                user &&
                <div>{user.pseudo}</div>
            }
        </>
    );
}