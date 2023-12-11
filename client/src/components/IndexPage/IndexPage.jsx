import { Loader } from "@googlemaps/js-api-loader";
import "./IndexPage.css";
import { useEffect, useRef, useState } from "react";

function IndexPage({ setCoordinates }){

  const mapEl = useRef(null);
  const findMe = useRef(null);
  const clearButton = useRef(null);
  const [currentMap, setCurrentMap] = useState(null);
  const [drawing, setDrawing] = useState(null);
  const [core, setCore] = useState(null);
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
    if (lat && lng){
      currentMap.panTo({lat, lng});
      currentMap.setZoom(10);
    }
  }
    
  function handleErrorGeolocation(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (!currentMap) {
      return;
    } else if (isNaN(lat) || isNaN(lng)) {
      return;
    } else {
      let myLocation = new window.google.maps.Marker({
        position: {lat, lng},
        title: "You are here!",
      });
      myLocation.setMap(currentMap);
      currentMap.panTo({lat, lng});
      currentMap.setZoom(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng])

  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
    libraries: ["drawing", "core", "places", "maps"],
  })

  useEffect(() => {
    
    const mapOptions = {
      center: {
        lat: 52,
        lng: 18.296097,
      },
      zoom: 7,
      disableDefaultUI: true,
      draggableCursor: 'default',
    };

    loader.importLibrary('maps')
    .then(({Map}) => {
      setCurrentMap(new Map(mapEl.current, mapOptions));
    })
    .catch((e) => {
      console.log(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapEl])

  useEffect(() => {
    if (currentMap && findMe) {
      currentMap.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(findMe.current);
      currentMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(clearButton.current);
    }
  }, [clearButton, findMe, currentMap])

  useEffect(() => {
        loader.importLibrary('drawing')
    .then(res => {
      setDrawing(res);
    })
    .catch((e) => {
      console.log(e);
    });
    
    loader.importLibrary('core')
    .then(res => {
      setCore(res);
    })
    .catch((e) => {
      console.log(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let placeIdArray = [];
  let polylines = [];
  let snappedCoordinates = [];

  if(drawing && core){
    const drawingManager = new drawing.DrawingManager({
      drawingMode: drawing.OverlayType.POLYLINE,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          drawing.OverlayType.POLYLINE
        ]
      },
      polylineOptions: {
        strokeColor: '#696969',
        strokeWeight: 2,
        strokeOpacity: 0.3,
      }
    })
    drawingManager.setMap(currentMap);
    
    drawingManager.addListener('polylinecomplete', function(poly) {
      let path = poly.getPath();
      polylines.push(poly);
      placeIdArray = [];
      runSnapToRoad(path);
    });

    async function runSnapToRoad(path) {
      let pathValues = [];
      for (let i = 0; i < path.getLength(); i++) {
        pathValues.push(path.getAt(i).toUrlValue());
      }
      let pathParameters = {
        method: "GET"
      }
      await fetch(`https://roads.googleapis.com/v1/snapToRoads?interpolate=true&path=${pathValues.join('|')}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}` ,pathParameters)
        .then(response => response.json())
        .then((data) => {
          setCoordinates(data);
          processSnapToRoadResponse(data)})
        .then(snappedCoordinates => drawSnappedPolyline(snappedCoordinates))
        .catch((e) => {
          console.log(e);
        })
    }
  }
  
  function processSnapToRoadResponse(data) {
    console.log(data)
    snappedCoordinates = [];
    placeIdArray = [];
    for (let i = 0; i < data.snappedPoints.length; i++) {
      let latlng = new window.google.maps.LatLng(
          data.snappedPoints[i].location.latitude,
          data.snappedPoints[i].location.longitude);
      snappedCoordinates.push(latlng);
      placeIdArray.push(data.snappedPoints[i].placeId);
    }
    return snappedCoordinates;
  }

  function drawSnappedPolyline(snappedCoordinates) {
    let snappedPolyline = new window.google.maps.Polyline({
      path: snappedCoordinates,
      strokeColor: '#0f53ffff',
      strokeWeight: 4,
      strokeOpacity: 0.9,
    });
    snappedPolyline.setMap(currentMap);
    polylines.push(snappedPolyline);
  }

  function clearPath() {
    for (let i = 0; i < polylines.length; ++i) {
      polylines[i].setMap(null);
    }
    polylines = [];
    return false;
  };

  return (
    <div ref={mapEl} className="flex-box">
      <div ref={findMe} className="icon-box">
        <svg onClick={getLocation} className="my-location bg-background cursor-pointer hover:text-icons" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"/><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z" fill="#282641"/> <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3.28169C16.9842 3.64113 20.3589 7.01581 20.7183 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20.7183C20.3589 16.9842 16.9842 20.3589 12.75 20.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20.7183C7.01581 20.3589 3.64113 16.9842 3.28169 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3.28169C3.64113 7.01581 7.01581 3.64113 11.25 3.28169V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.75 12C4.75 16.0041 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12Z" fill="#282641"/> </g><svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"></svg></svg>
      </div>
      <div ref={clearButton} className="clear-button-box">
        <svg onClick={clearPath} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="bin-icon w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    </div>
  );

}

export default IndexPage