import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({lat,lng}){
    if(!lat || !lng) return <p className="text-red-500">GPS Not Found</p>;

    return (
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "200px", width: "100%" }}
        className="rounded overflow-hidden"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>
            location: {lat}, {lng}
          </Popup>
        </Marker>
      </MapContainer>
    );
}