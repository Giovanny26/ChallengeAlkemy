import React from "react";
import "./details.css"

export default function RecipeDetails(props){

    return (
        <div className="detail">  
            <ul className="detailList">
                <li className="detailTitle">Price: ${props.product.pricePerServing}</li>
                <li className="detailTitle">Time: {props.product.readyInMinutes}Min</li>
            </ul>
            <ul className="detailList">
                <li className="detailTitle">Health Score: {props.product.healthScore}</li>
            </ul>
      </div> 
    )
}
