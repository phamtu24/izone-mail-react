import React, { useState, useEffect, useRef } from 'react';
import loader from '../../../icon/loader.gif';

const isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top <= (
            window.innerHeight || 
            document.documentElement.clientHeight
          )
    );
}




export default (props) => {
    const { handleClick, image} = props;
    const [loaded, setLoad] = useState(false);
    const thisEle = useRef(null);

    useEffect(() => {
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => (window.removeEventListener('scroll', handleScroll))
    })

    const handleScroll = () => {
        let isIn = isElementInViewport(thisEle.current);
        if (loaded == false && isIn == true ) { 
            thisEle.current.setAttribute(
                'style',
                `background-image:  url(${image.url}), url(${loader})`
            )
            setLoad(true)
         }
    }

    return (
        <div className="photos"
            onClick={handleClick}
            ref={thisEle}
            id={image.url + ',' + image.messageID}
        >
        </div>
    )



}