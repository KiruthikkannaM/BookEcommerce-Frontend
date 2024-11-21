import React, { useState } from "react";
import AddToCart from "../components/AddToCart.jsx"
import "../components/popup.css"


function PopUp(props){
    const userId=localStorage.getItem("userId");

    return (
        <div className="popup-container">
            <div className="popup-header">
            <h1 className="popup-title">{props.title}</h1>
            <button onClick={props.onClose} className="popup-close">&times;</button>
            </div>
            <div className="popup-image-container"><img className="popup-image" alt={props.title} src={props.image_link}/></div>
            <div className="popup-details">
            <div className="popup-detail-author"><strong>Author:</strong> {props.authors}</div>
            <div className="popup-detail-genre"><strong>Genre:</strong> {props.genre}</div>
            <div className="popup-detail-pages"><strong>Pages:</strong> {props.page}</div>
            <div className="popup-detail-description"><strong>Description:</strong> {props.description}</div>
            <div className="popup-detail-price"><strong>Price:</strong> {props.price}</div>
            </div>
            <div className="add-to-cart-button">
            <AddToCart userId={userId} itemId={props.isbn} price={props.price} className="add-to-cart"/>
            </div>
            
        </div>
    )
}

export default PopUp;