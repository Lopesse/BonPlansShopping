import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { URLS } from '../dataBase/apiURLS';
import './css/aPropos.css';


export default function APropos(props) {
    return (
        <>
            <div className='aPropos'>
                <div>
                    <h3>A propos de ce projet</h3>
                    <div>Ce projet a été crée dans le cadre du module "Projet Annuel" 
                        de notre 3ème année de licence infomatique.</div>
                    <div>Notre groupe de projet se compose de :</div>
                    <ul>
                        <li>Chamora SAMAKON</li>
                        <li>Daniel AZEVEDO GOMES</li>
                        <li>Manon JAMES</li>
                        <li>Djalila LOMBA</li>
                    </ul>
                </div>
            </div>
        </>
    );
}