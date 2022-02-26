import "./products.css";
import { useState, Fragment } from 'react';
import { useEffect } from "react";
import Swal from "sweetalert2";
import RecipeDetails from "../Details";



export default function Listado(props) {
    const [show, setShow] = useState(false);
    const [veganFood, setVeganFood] = useState(()=>{
        if (window.localStorage.getItem("vegan") != null) {
            return JSON.parse(window.localStorage.getItem("vegan"))
        }else return []
    });
    const [normalFood, setNormalFood] = useState(()=>{
        if (window.localStorage.getItem("normal") != null) {
            return JSON.parse(window.localStorage.getItem("normal"))
        }else return []
    });
    const [totalPrice, setTotalPrice] = useState (()=>{
        if (veganFood >= [1] || normalFood >= [1]) {
            return Math.round(veganFood.map(item => item.pricePerServing).reduce((prev, curr) => prev + curr, 0) + normalFood.map(item => item.pricePerServing).reduce((prev, curr) => prev + curr, 0))
        }else return 0
    })
    const [totalTime, setTotalTime] = useState (()=>{
        if (veganFood >= [1]|| normalFood >= [1]) {
            return Math.round(veganFood.map(item => item.readyInMinutes).reduce((prev, curr) => prev + curr, 0) + normalFood.map(item => item.readyInMinutes).reduce((prev, curr) => prev + curr, 0) / (veganFood.length + normalFood.length))
        }else return 0
    });
    const [totalHealth, setTotalHealth] = useState (()=>{
        if (veganFood >= [1] || normalFood >= [1]) {
            return Math.round(veganFood.map(item => item.healthScore).reduce((prev, curr) => prev + curr, 0) + normalFood.map(item => item.healthScore).reduce((prev, curr) => prev + curr, 0) / (veganFood.length + normalFood.length))
        }else return 0
    });
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    function handleVeganLocalStorage(){
        return window.localStorage.setItem("vegan", JSON.stringify(veganFood))
    };
    function handleNormalLocalStorage(){
        return window.localStorage.setItem("normal", JSON.stringify(normalFood))
    };
    useEffect(()=>{
        window.localStorage.setItem("vegan", JSON.stringify(veganFood))
        window.localStorage.setItem("normal", JSON.stringify(normalFood))
    });  
    function handleProducts(propiedad){
            if(propiedad.vegan === true && veganFood.length <= 1){   
                window.location.reload(false);
                setVeganFood(prevArray => [...prevArray, propiedad]);
                handleVeganLocalStorage();
                Toast.fire({
                    icon: 'info',
                    title: 'Cargando...'
                })
            }else if(propiedad.vegan !== true && normalFood.length <= 1){
                window.location.reload(false);
                setNormalFood(prevArray => [...prevArray, propiedad]);
                handleNormalLocalStorage();
                Toast.fire({
                    icon: 'info',
                    title: 'Cargando...'
                })
            }else if(propiedad.vegan === true || veganFood.length == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'El producto no es vegano y/o ya hay suficientes elementos en el menu',
                    text: 'Por favor elimine un elemento vegano del menu o añada un elemento que sea vegano',
                  })
            }else if(propiedad.vegan === false || normalFood.length == 1){
                Swal.fire({
                    icon: 'error',
                    title: 'El producto es vegano y/o ya hay suficientes elementos en el menu',
                    text: 'Por favor elimine un elemento del menu o añada un elemento que no sea vegano',
                  })
            }
    };
    function deleteProducts(propiedad){
        let idProduct = propiedad.id
        if(propiedad.vegan == true){
            window.location.reload(false);
            veganFood.splice(getIndice(idProduct), 1)
            window.localStorage.setItem("vegan", JSON.stringify(veganFood))
            function getIndice(idProduct) {
                let Indice = -1;
                veganFood.filter(function (product, i) {
                    if (product.id === idProduct) {
                        Indice = i;
                    }
                });
                return Indice;
            }
            Toast.fire({
                icon: 'info',
                title: 'Cargando...'
            })
        }else if (propiedad.vegan == false){
            window.location.reload(false);
            normalFood.splice(getIndice(idProduct), 1)
            window.localStorage.setItem("normal", JSON.stringify(normalFood))
            function getIndice(idProduct) {
                let Indice = -1;
                normalFood.filter(function (product, i) {
                    if (product.id === idProduct) {
                        Indice = i;
                    }
                });
                return Indice;
            }
            Toast.fire({
                icon: 'info',
                title: 'Cargando...'
            })
        }        
    }

    return (
        <div className="list">
            <h2 className="listTitle">Productos</h2>
            <section className="listCard">{
                props.allProducts ?
                    props.allProducts.map((propiedad, index) => {
                        return (
                            <Fragment>
                                <div className="card" key={index + 1}>
                                    <div className="cardHeader">
                                        <h2 className="cardTitle">{propiedad.title}</h2>
                                        <img className="cardImg" src={propiedad.image} alt={propiedad.title} />
                                    </div>
                                    <div className="cardInfo">  
                                    </div>
                                    <div className="cardButton">
                                        <button className ="button"onClick={() => setShow(!show)}>Detalles</button>
                                        <button className= "button"onClick={()=>{
                                            handleProducts(propiedad)
                                        }}>Añadir al Menu</button>
                                    </div>
                                    <div className="details">
                                        {show && <RecipeDetails producto={propiedad} />}
                                    </div>
                                </div> 
                            </Fragment>
                        )
                    })
                : <></>             
            }
            </section>
            <hr></hr>
                <div className="menuInfo">
                    <p className="menuPrice">Menu total price: ${totalPrice}</p>
                    <p className="menuTime">Menu total time: {totalTime}Min</p>
                    <p className="menuHealth">Menu total Health Score: {totalHealth}</p>
                </div>
                <h2 className="menuTitle">Mi menu vegano</h2>
                <section className="listCard">{
                    veganFood ?
                        veganFood.map((propiedad, index) => {
                            return (
                                <Fragment>
                                    <div className="card" key={index + 2}>
                                        <div className="cardHeader">
                                            <h2 className="cardTitle">{propiedad.title}</h2>
                                            <img className="cardImg" src={propiedad.image} alt={propiedad.title} />
                                        </div>
                                        <div className="cardInfo">  
                                        </div>
                                        <div className="cardButton">
                                            <button className ="button" onClick={() => setShow(!show)}>Detalles</button>
                                            <button className ="button" onClick={() => {
                                                    deleteProducts(propiedad)
                                                }}
                                            >Eliminar del Menu</button>
                                        </div>
                                        <div className="details">
                                        {show && <RecipeDetails producto={propiedad} />}
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                        :<></>
                }
                </section>
                <hr></hr>
                <h2 className="menuTitle">Mi menu no vegano</h2>
                <section className="listCard">{
                    normalFood ?
                        normalFood.map((propiedad, index) => {
                            return (
                                <Fragment>
                                    <div className="card" key={index + 3}>
                                        <div className="cardHeader">
                                            <h2 className="cardTitle">{propiedad.title}</h2>
                                            <img className="cardImg" src={propiedad.image} alt={propiedad.title} />
                                        </div>
                                        <div className="cardInfo">  
                                        </div>
                                        <div className="cardButton">
                                            <button className ="button" onClick={() => setShow(!show)}>Detalles</button>
                                              
                                            <button className ="button" onClick={() => {
                                                    deleteProducts(propiedad)
                                                }}
                                            >Eliminar del Menu</button>
                                        </div>
                                        <div className="details">
                                            {show && <RecipeDetails producto={propiedad} />}
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                        :<></>
                }
                </section>
                <div className="finalPage"></div>
        </div>
    )
}
