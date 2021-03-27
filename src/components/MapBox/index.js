import React from "react";
import Map from "./../Map/index";


function MapBox(props) {
    let lat = 40;
    let lon = -97;
    let zoom = 4;

    return (
        <>
            <Map lat={lat} lon={lon} zoom={zoom} pins={props.results} />
        </>
    )
}

export default MapBox; 