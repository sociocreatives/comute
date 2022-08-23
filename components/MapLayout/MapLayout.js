import React, { useState, useRef } from 'react'
import { signOut } from "next-auth/react"
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/comute_logo.png'
import { HiOutlineLogout } from 'react-icons/hi';
import { MdMyLocation } from 'react-icons/md'
// import mapStyles from '../../mapStyles'
import styles from "../../styles/MapLayout.module.css"
import { GoogleMap, useLoadScript, useJsApiLoader, Marker, Autocomplete, DirectionsService, DirectionsRenderer, Polyline } from '@react-google-maps/api';
import usePlacesAutoComplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import NavigationBarHome from '../NavigationBarHome/NavigationBarHome';

const mapStyles = 
    [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a7a7a7"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#737373"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#dadada"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#696969"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#256d85"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b3b3b3"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#8d1717"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#97a3a4"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d6d6d6"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": 1.8
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d7d7d7"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#808080"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#ff0000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d3d3d3"
                }
            ]
        }
    ]


const libraries = ["places"]

const mapContainerStyles = {
    width: "100vw",
    height: "100vh",
}
const center = {
    lat: -4.334004246702967, 
    lng: 15.299163778489355
}
const options ={
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const MapLayout = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCnSALS_W4_pClAPF1bWYIDBhIe7G-82WY",
        libraries
    });

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */ 
    const originRef = useRef()

    /** @type React.MutableRefObject<HTMLInputElement> */ 
    const destinationRef = useRef()

    if (loadError) return "Error Loading Map";
    if (!isLoaded) return "Loading Maps"

    async function calculateRoute(){
        if (originRef.current.value === '' || destinationRef.current.value === ''){
            return
        }
            const directionsService = new google.maps.DirectionsService()
            const routePath = new google.maps.Polyline({
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            })
            const results = await directionsService.route({
                origin: originRef.current.value,
                destination: destinationRef.current.value,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            setDirectionsResponse(results)
            setDistance(results.routes[0].legs[0].distance.text)
            setDuration(results.routes[0].legs[0].duration.text)
        }

        function clearRoute(){
            setDirectionsResponse(null)
            setDistance('')
            setDuration('')
            originRef.current.value=''
            destinationRef.current.value=''
        }

  return (
    <div>
    <div className={styles.bigbox}>
    <NavigationBarHome/>
        <div className={styles.header}>
            <h3>Driving Routes</h3>
        </div>

        <div> 
            <Autocomplete><input type="text" placeholder='Select Starting Point' className={styles.input} ref={originRef}/></Autocomplete>
            <Autocomplete><input type="text" placeholder='Select Destination' className={styles.input} ref={destinationRef}/></Autocomplete>
            <button className={styles.buttons} onClick={calculateRoute}>Find Route</button>
        </div>
        <div className={styles.location}>
        <MdMyLocation className={styles.mylocation} onClick={() => {
            map.panTo(center)
            map.setZoom(14)
          }}
          /><h4 onClick={() => {
            map.panTo(center)
            map.setZoom(14)
          }}>My Location</h4>
        </div>
        <div className={styles.result}>
        <h4>{distance}</h4>|<h4>{duration}</h4>
        </div>
        <button className="btnnew" onClick={() => signOut()}><HiOutlineLogout/></button>

        
    </div>

    <GoogleMap 
        mapContainerStyle={mapContainerStyles} 
        zoom={15} 
        center={center}
        options={options}
        onLoad={map => setMap(map)}
        >

        <Marker 
        position={center}
        icon={{
            url: "/car.png",
            scaledSize: new window.google.maps.Size(60,80),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15),
            animation: google.maps.Animation.BOUNCE
        }}
        />
          {directionsResponse && (
            <DirectionsRenderer 
            directions={directionsResponse}
            />
          )}
    </GoogleMap>
    

    </div>
  )
}

export default MapLayout




