import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router";

const position = [22.3569, 91.7832];

const Coverage = () => {
  const serviceSenter = useLoaderData();
  const Mapref = useRef(null);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const location = event.target.location.value.trim();

    if (!location) return;

    const district = serviceSenter.find((service) =>
      service.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      setSelectedDistrict(district);
      setNotFound(false);

      const coordinates = [district.latitude, district.longitude];

      Mapref.current?.flyTo(coordinates, 14, {
        duration: 1.5,
      });
    } else {
      setNotFound(true);
    }
  };

  // 👉 ONLY CHITTAGONG FOCUS QUICK ACTIONS
const divisions = [...new Set(serviceSenter.map((item) => item.region))];

const handleDivisionSelect = (division) => {
  const district = serviceSenter.find(
    (item) => item.region === division
  );

  if (!district) return;

  setSelectedDistrict(district);

  Mapref.current?.flyTo(
    [district.latitude, district.longitude],
    9,
    {
      duration: 1.5,
    }
  );
};

  const resetView = () => {
    setSelectedDistrict(null);
    Mapref.current?.flyTo(position, 7, { duration: 1.5 });
  };

  return (
    <div className=" flex flex-col bg-[#0B0F1A] text-white ">

      {/* HEADER */}
      <div className="text-center pt-10 px-4">
        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          Live Service Coverage Map
        </h2>
        <p className="text-gray-400 mt-3">
          Explore Chattogram region service availability in real-time
        </p>
      </div>

      {/* SEARCH + CONTROLS */}
      <div className="flex flex-col items-center mt-8 px-4">

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 w-full max-w-xl shadow-lg"
        >
          <input
            type="text"
            name="location"
            placeholder="Search district..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          />
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-semibold hover:scale-105 transition">
            Search
          </button>
        </form>

        {notFound && (
          <p className="text-red-400 mt-3 text-sm">
            District not found
          </p>
        )}

        {/* QUICK ACTIONS (CHATTOGRAM ONLY) */}
       <div className="flex flex-wrap justify-center gap-2 mt-5">
  {divisions.map((division) => (
    <button
      key={division}
      onClick={() => handleDivisionSelect(division)}
      className={`px-4 py-2 rounded-full border text-sm transition
      ${
        selectedDistrict?.region === division
          ? "bg-cyan-500 text-black"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      {division}
    </button>
  ))}
</div>

        {/* RESET BUTTON */}
        <button
          onClick={resetView}
          className="mt-4 text-sm text-gray-400 hover:text-white transition"
        >
          Reset View
        </button>
      </div>

      {/* MAP + INFO PANEL */}
      <div className="flex-1 px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* MAP */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[750px]">
          <MapContainer
            className="w-full h-full"
            center={position}
            zoom={7}
            scrollWheelZoom={true}
            ref={Mapref}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceSenter.map((service, i) => (
              <Marker
                key={i}
                position={[service.latitude, service.longitude]}
              >
                <Popup>
                  <strong>{service.district}</strong>
                  <br />
                  Service Area: {service.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* SIDE INFO PANEL */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 h-[750px] overflow-auto">
          <h3 className="text-xl font-semibold mb-4">
            District Details
          </h3>

          {selectedDistrict ? (
            <div className="space-y-3">
              <p>
                <span className="text-gray-400">District:</span>{" "}
                <span className="text-cyan-400 font-semibold">
                  {selectedDistrict.district}
                </span>
              </p>

              <p>
                <span className="text-gray-400">Coverage:</span>
                <br />
                {selectedDistrict.covered_area.join(", ")}
              </p>
          
            </div>
          ) : (
            <p className="text-gray-400 text-sm">
              Select a district to see details
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Coverage;