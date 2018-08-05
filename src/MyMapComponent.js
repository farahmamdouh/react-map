/* start */
import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { compose, withProps, withStateHandlers} from "recompose"


const MyMapComponent = compose(
    withStateHandlers(()=>({
      isOpen: false,
      }),

      {
    onToggleOpen: ({ isOpen })=>()=>({
        isOpen: !isOpen,
      })
    }),

    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRVGGz75ifNn8xtpdYg6IzUe0vicXRoJw&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: window.innerHeight }} />,
      mapElement: <div style={{ height: `100%` }} />,
      /*global google*/
    }),
    withScriptjs,
    withGoogleMap,

  )
  
  ((props) => (
    
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 30.078072, lng: 31.2953939 }}
  >
    {
      props.searchList.map((Location) =>
      //location marker
      <Marker
        key={Location.id}
        position={Location.location} 
        onClick={(event) => {props.onMarkerClick(Location)} }
        defaultAnimation={google.maps.Animation.BOUNCE}
      >
      
      {
        //selected location in show info window
        (props.clickedID === Location.id) && (<InfoWindow onCloseClick={props.onToggleOpen}>
          <div tabIndex={Location.id+0} className='InfoWindow'>{Location.Info}</div>
        </InfoWindow>)
      }
      </Marker>
      )
    }
  </GoogleMap>
))

export default MyMapComponent;
