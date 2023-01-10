import React, { useState } from "react"
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div className="google-map-cmp">{text}</div>

export function GoogleMap() {
    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    function onBranch(branch) {
        switch (branch) {
            case 'ashdod':
                setCoordinates({ lat: 31.801447, lng: 34.643497 })
                break;
            case 'ashkelon':
                setCoordinates({ lat: 31.66667, lng: 34.5697 })
                break;
            case 'petah-tiqva':
                setCoordinates({ lat: 32.109333, lng: 34.855499 })
                break;
            case 'rehovot':
                setCoordinates({ lat: 31.894756, lng: 34.809322 })
                break;
            case 'dimona':
                setCoordinates({ lat: 31.069420, lng: 35.033363 })
                break;
            default:
                break;
        }
    }

    return (
        // Important! Always set the container height explicitly
        <>
            <button onClick={() => onBranch('ashdod')}>Ashdod</button>
            <button onClick={() => onBranch('ashkelon')}>Ashkelon</button>
            <button onClick={() => onBranch('petah-tiqva')}>Petah Tiqva</button>
            <button onClick={() => onBranch('rehovot')}>Rehovot</button>
            <button onClick={() => onBranch('dimona')}>Dimona</button>

            <div style={{ height: '560px', width: '650px', margin: 'auto' }}>
                <GoogleMapReact
                    onClick={handleClick}
                    bootstrapURLKeys={{ key: "AIzaSyD2BO1ZuhBV_3IMU5L1VTCoB_c0rRFCkcM" }}
                    defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    <AnyReactComponent
                        {...coordinates}
                        text="🏪"
                    />
                </GoogleMapReact>
            </div>
        </>
    )
}