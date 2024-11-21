import React, { useState } from "react";
import { Card, Typography } from "antd";
import PopUp from "./popup";
import "../components/CardComponent.css"


const {Text}=Typography;
function CardComponent(props){
    const [popupopen,setPopupOpen]=useState(false);

    const handleCardClick = () => {
        setPopupOpen(true);
        document.getElementById('blur-wrapper').classList.add('blur-background');
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        document.getElementById('blur-wrapper').classList.remove('blur-background');
    };



    // const PopUp=()=>{
    //     if(popupopen===true){
    //         <PopUp
    //             title={props.title}
    //             authors={props.authors}
    //             genre={props.genre}
    //             description={props.description}
    //             image_link={props.image_link}
    //             page={props.page}
    //             price={props.price}
    //         />

    //     }

    // }

    return (
        <div>
        <Card 
            hoverable
            className="card-component"
            onClick={handleCardClick}
            cover={
                <div className="card-image-container">
                    <img alt={props.title} src={props.image_link}/>
                </div>
            }
            >
                <div className="card-content">
                    <Text className="card-title">{props.title}</Text>
                </div>
            </Card>
            {popupopen &&(
                <>
                <div className="popup-overlay" onClick={handleClosePopup}></div>
                <PopUp
                    isbn={props.isbn}
                    title={props.title}
                    authors={props.authors}
                    genre={props.genre}
                    description={props.description}
                    image_link={props.image_link}
                    page={props.page}
                    price={props.price}
                    onClose={handleClosePopup} 
                />
                </>

            )}
            
            </div>
    )

}

export default CardComponent;