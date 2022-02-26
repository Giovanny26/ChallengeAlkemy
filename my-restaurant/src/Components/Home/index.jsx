import React, {useEffect, useState } from "react";
import Search from "../../Components/Search"
import Products from "../../Components/Products"
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

export default function Home() {
    const [allProducts, setAllProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!window.localStorage.getItem('user-token')){
            Swal.fire({
                icon: 'warning',
                title: 'Login to access the site',
                text: 'Please login',
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
