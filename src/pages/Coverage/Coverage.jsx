
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from 'react-router';



const position = [22.3569, 91.7832];
// saittakund-Lat--22.6216, lng--91.6704
const Coverage = () => {
  const serviceSenter = useLoaderData();
  
  
  return (
    <div>
      <h2 className="text-5xl">We are available in 64 districts</h2>
      {/* -----------------search------------- */}
      <div></div>
      {/* -------------------map--------------  */}
      <div className="border w-full h-[800px] my-10">
          <MapContainer
          className="w-full h-full"
           center={position} zoom={7} scrollWheelZoom={false}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {
          serviceSenter.map((service,i) => (
            <Marker key={i} position={[service.latitude, service.longitude]}>
              <Popup>
                <strong>{service.district}</strong> <br /> 
                Service Area: {service.covered_area.join(', ')} <br /> 
              </Popup>
            </Marker>
          ))  
        }
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
