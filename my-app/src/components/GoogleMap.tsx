import React from "react"
import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps"

interface Props {
    label: string,
    location?: { lng: any, lat: any }
    onClick?(e: any): void
}

const GoogleMapComponent = withScriptjs(withGoogleMap((props: Props) => {
    return <GoogleMap
        defaultZoom={3}
        defaultCenter={{ ...props.location }}
        onClick={props.onClick}
    >
        <Marker position={{ ...props.location }} />
    </GoogleMap>
}
))

export default GoogleMapComponent;
