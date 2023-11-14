import { Loader } from "@googlemaps/js-api-loader";
import "./IndexPage.css";
import { useEffect, useRef, useState } from "react";

function IndexPage(){

  const mapEl = useRef(null);
  const findMe = useRef(null);
  const [map, setMap] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccessGeolocation, handleErrorGeolocation)
    } else {
      alert("Error: Your browser doesn't support geolocation.")
    }
  }
  
  function handleSuccessGeolocation(pos) {
    const crd = pos.coords;
    setLat(crd.latitude);
    setLng(crd.longitude);
  }
    
  function handleErrorGeolocation(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (!map) {
      return;
    } else if (isNaN(lat) || isNaN(lng)) {
      return;
    } else {
      var myLocation = new window.google.maps.Marker({
        position: {lat, lng},
        title: "You are here!",
      });
      myLocation.setMap(map);
      map.panTo({lat, lng});
      map.setZoom(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng])

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });
  
  const mapOptions = {
    center: {
      lat: 52,
      lng: 18.296097,
    },
    zoom: 7,
    disableDefaultUI: true,
    draggableCursor: 'default',
  };

  useEffect(() => {
    loader
    .importLibrary('maps')
    .then(({Map}) => {
      setMap(new Map(mapEl.current, mapOptions));
    })
    .catch((e) => {
      console.log(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapEl])

  useEffect(() => {
    if (map && findMe) {
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(findMe.current);
    }
  }, [findMe, map])

  return (
    <div ref={mapEl} className="flex-box">
      <div ref={findMe} className="icon-box">
        <svg onClick={getLocation} className="my-location bg-background cursor-pointer hover:text-icons" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 24 24" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#282641"/> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3.28169C16.9842 3.64113 20.3589 7.01581 20.7183 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20.7183C20.3589 16.9842 16.9842 20.3589 12.75 20.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20.7183C7.01581 20.3589 3.64113 16.9842 3.28169 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3.28169C3.64113 7.01581 7.01581 3.64113 11.25 3.28169V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12Z" fill="#282641"/> </g><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"></svg></svg>
      </div>
    </div>
  );

}

export default IndexPage