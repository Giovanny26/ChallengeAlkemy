import "./products.css";
import { useState, Fragment } from 'react';
import { useEffect } from "react";
import Swal from "sweetalert2";
import RecipeDetails from "../Details";



export default function List(props) {
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
    function handleProducts(item){
            if(item.vegan === true && veganFood.length <= 1){   
                window.location.reload(false);
                setVeganFood(prevArray => [...prevArray, item]);
                handleVeganLocalStorage();
                Toast.fire({
                    icon: 'info',
                    title: 'Loading...'
                })
            }else if(item.vegan !== true && normalFood.length <= 1){
                window.location.reload(false);
                setNormalFood(prevArray => [...prevArray, item]);
                handleNormalLocalStorage();
                Toast.fire({
                    icon: 'info',
                    title: 'Loading...'
                })
            }else if(item.vegan === true || veganFood.length === 1){
                Swal.fire({
                    icon: 'error',
                    title: 'The product is not vegan and/or there are already enough items on the menu',
                    text: 'Please remove a vegan item from the menu or add an item that is vegan',
                  })
            }else if(item.vegan === false || normalFood.length === 1){
                Swal.fire({
                    icon: 'error',
                    title: 'The product is vegan and/or there are already enough items on the menu',
                    text: 'Please remove a menu item or add a non-vegan item',
                  })
            }
    };
    function deleteProducts(item){
        let idProduct = item.id
        if(item.vegan === true){
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
                title: 'Loading...'
            })
        }else if (item.vegan === false){
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
                title: 'Loading...'
            })
        }        
    }

    return (
        <div className="list">
            <h2 className="listTitle">Products</h2>
            <section className="listCard">{
                props.allProducts ?
                    props.allProducts.map((item, index) => {
                        return (
                            <Fragment>
                                <div className="card" key={index + 1}>
                                    <div className="cardHeader">
                                        <h2 className="cardTitle">{item.title}</h2>
                                        <img className="cardImg" src={item.image} alt={item.title} />
                                    </div>
                                    <div className="cardInfo">  
                                    </div>
                                    <div className="cardButton">
                                        <button className ="button"onClick={() => setShow(!show)}>Details</button>
                                        <button className= "button"onClick={()=>{
                                            handleProducts(item)
                                        }}>Add to Menu</button>
                                    </div>
                                    <div className="details">
                                        {show && <RecipeDetails product={item} />}
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
                <h2 className="menuTitle">Vegan menu</h2>
                <section className="listCard">{
                    veganFood ?
                        veganFood.map((item, index) => {
                            return (
                                <Fragment>
                                    <div className="card" key={index + 2}>
                                        <div className="cardHeader">
                                            <h2 className="cardTitle">{item.title}</h2>
                                            <img className="cardImg" src={item.image} alt={item.title} />
                                        </div>
                                        <div className="cardInfo">  
                                        </div>
                                        <div className="cardButton">
                                            <button className ="button" onClick={() => setShow(!show)}>Details</button>
                                            <button className ="button" onClick={() => {
                                                    deleteProducts(item)
                                                }}
                                            >Remove from Menu</button>
                                        </div>
                                        <div className="details">
                                        {show && <RecipeDetails product={item} />}
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                        :<></>
                }
                </section>
                <hr></hr>
                <h2 className="menuTitle">Non vegan menu</h2>
                <section className="listCard">{
                    normalFood ?
                        normalFood.map((item, index) => {
                            return (
                                <Fragment>
                                    <div className="card" key={index + 3}>
                                        <div className="cardHeader">
                                            <h2 className="cardTitle">{item.title}</h2>
                                            <img className="cardImg" src={item.image} alt={item.title} />
                                        </div>
                                        <div className="cardInfo">  
                                        </div>
                                        <div className="cardButton">
                                            <button className ="button" onClick={() => setShow(!show)}>Details</button>
                                              
                                            <button className ="button" onClick={() => {
                                                    deleteProducts(item)
                                                }}
                                            >Remove from Menu</button>
                                        </div>
                                        <div className="details">
                                            {show && <RecipeDetails product={item} />}
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
