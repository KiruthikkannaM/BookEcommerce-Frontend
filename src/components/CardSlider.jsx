import React, { useState } from "react";
import {Carousel, Card, Button} from "antd";
import { posters } from "./posters";
import "../components/CardSlider.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";




const CardSlider=()=>{
    const [currentSlide,setcurrentSlide]=useState(0);
    const carouselRef=React.useRef(null);
    const gotoNext=()=>{
        carouselRef.current.next();
    }
    const gotoPrev=()=>{
        carouselRef.current.prev();
    }
    return(
        <div className="cardSlider-container">
            <button className="prevArrow" onClick={gotoPrev}><LeftOutlined/></button>
            <Carousel autoplay
                      ref={carouselRef}
                      beforeChange={(current,next)=>{setcurrentSlide(next)}}
                      dots={false}
                      >
                        {posters.map((poster,index)=>(
                            <div key={index}>
                                <Card
                                
                                cover={<img alt={poster.title} src={poster.src}/>}
                                >

                                </Card>
                            </div>
                        ))}
                      </Carousel>
            <button className="nextArrow" onClick={gotoNext}><RightOutlined/></button>  
            <div className="carousel-dots">
                {posters.map((_,index)=>(
                    <span
                    key={index}
                    className={`dot ${currentSlide===index?"active":""}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardSlider;

