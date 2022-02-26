import React, {Fragment, useEffect, useState } from "react";
import Search from "../../Components/Search"
import Products from "../../Components/Products"
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!window.localStorage.getItem('user-token')){
            Swal.fire({
                icon: 'error',
                title: 'Inicie sesion para acceder al sitio',
                text: 'Por favor inicie sesion',
              })
            setTimeout(() => {
                navigate('/login')
            }, 3000);
            
        }
    })
    

    return (
        <>
            <Search setAllProducts={setAllProducts}/>
            <Products allProducts={allProducts}/>
        </>

    )
}
