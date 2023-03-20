import React, { useState } from "react";
import left from "./left.png"
import right from "./right.png"
import "./Slider.css"
import SliderSelect from "./SliderSelect";

const Slider = ({ arr }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState("slider__container__img--active")

    const prev = () => {
        const firstImage = currentIndex === 0;
        const newIndex = firstImage ? arr.length - 1 : currentIndex - 1;
        setActive("");
        setTimeout(() => {
            setCurrentIndex(newIndex)
            setActive(active)
        }, 500)
    }

    const next = () => {
        const lastImage = currentIndex === arr.length - 1;
        const newIndex = lastImage ? 0 : currentIndex + 1;
        setActive("")
        setTimeout(() => {
            setCurrentIndex(newIndex)
            setActive(active)
        }, 500)
    }

    return (
        <div>
            <div className="slider__container">
                <img className="slider__container__arrow" src={left} onClick={prev} alt="left arrow" />
                <img className={`slider__container__img ${active}`} src={arr[currentIndex]} alt="product" />
                <img className="slider__container__arrow" src={right} onClick={next} alt="right arrow"/>
            </div>
            <div className="slider__selector">
                {
                    arr.map((img, index) => (
                        <SliderSelect onClick={() => setCurrentIndex(index)} key={index} className={index === currentIndex ? "slider__current--active" : "slider__current"} />
                        // <SliderSelect onClick={() => setCurrentIndex(index)} key={index} fill={index === currentIndex ? "black" : "white"} style={index === currentIndex ? {fill:"black"} : {fill: "white"}}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Slider;