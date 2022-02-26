import React from "react";
import "./details.css"

export default function RecipeDetails(props){

    return (
        <div className="detail">  
            <ul className="detailList">
                <li className="detailTitle">Price: ${props.producto.pricePerServing}</li>
                <li className="detailTitle">Time: {props.producto.readyInMinutes}Min</li>
            </ul>
            <ul className="detailList">
                <li className="detailTitle">Health Score: {props.producto.healthScore}</li>
            </ul>
      </div> 
    )
}
