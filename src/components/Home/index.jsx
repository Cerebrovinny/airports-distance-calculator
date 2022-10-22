import React from "react";
import AutoComplete from "../AutoComplete";
import Map from "../../components/Map";
import {useLoadScript} from "@react-google-maps/api";
const API_KEY = process.env.API_KEY;

function Home() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: API_KEY,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <h1>Airport Distance Calculator</h1>
      <img src="/airplane.jpg" />
        {/*Pass autocomplete startMarker and endMarker to Map*/}
        <AutoComplete label={"Start"} />
        <AutoComplete label={"End"} />
      <h3>Distance:</h3>
        <div id="map">
        <Map />
        </div>
    </div>
  );
}


export default Home;