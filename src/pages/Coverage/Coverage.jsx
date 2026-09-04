import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
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

  const divisions = [...new Set(serviceSenter.map((item) => item.region))];

  const handleDivisionSelect = (division) => {
    const district = serviceSenter.find((item) => item.region === division);

    if (!district) return;

    setSelectedDistrict(district);

    Mapref.current?.flyTo([district.latitude, district.longitude], 9, {
      duration: 1.5,
    });
  };

  const resetView = () => {
    setSelectedDistrict(null);
    Mapref.current?.flyTo(position, 7, { duration: 1.5 });
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-gray-800">
      {/* HEADER */}
      <div className="text-center pt-10 px-4">
        <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold">
          Nationwide Service Coverage
        </span>

        <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-transparent bg-clip-text">
          Live Service Coverage Map
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Explore our service coverage areas across Bangladesh and quickly find
          available delivery locations near you.
        </p>
      </div>

      {/* SEARCH + CONTROLS */}
      <div className="flex flex-col items-center mt-8 px-4">
        {/* SEARCH FORM */}
     <form
  onSubmit={handleSearch}
  className="flex items-center gap-3 border-2 border-black bg-white/90 backdrop-blur-sm border rounded-2xl px-4 py-3 w-full max-w-xl shadow-lg hover:shadow-xl transition-all duration-300"
>
          <input
            type="text"
            name="location"
            placeholder="Search district..."
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl "
          >
          <FaSearch></FaSearch>
          </button>
        </form>

        {/* NOT FOUND */}
        {notFound && (
          <p className="text-red-500 mt-3 text-sm font-medium">
            District not found. Please try another district name.
          </p>
        )}

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {divisions.map((division) => (
            <button
              key={division}
              onClick={() => handleDivisionSelect(division)}
              className={`px-4 py-2 rounded-full border-4 border-black text-sm font-medium transition-all duration-200
              ${
                selectedDistrict?.region === division
                  ? "bg-cyan-500 border-cyan-500 border-2  text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {division}
            </button>
          ))}
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={resetView}
          className="mt-4 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
        >
          ↻ Reset View
        </button>
      </div>

      {/* MAP + INFO PANEL */}
      <div className="flex-1 px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* MAP */}
        <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-gray-200 shadow-xl h-[750px]">
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
              <Marker key={i} position={[service.latitude, service.longitude]}>
                <Popup>
                  <div className="text-gray-800 min-w-[180px]">
                    <h4 className="font-bold text-blue-600 text-base mb-1">
                      {service.district}
                    </h4>

                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">
                        Service Area:
                      </span>{" "}
                      {service.covered_area.join(", ")}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* SIDE INFO PANEL */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 h-[750px] overflow-auto shadow-lg">
          {/* PANEL HEADER */}
          <div className="mb-6 pb-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Coverage Information
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              District Details
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Select a location from the map or search above to view coverage
              details.
            </p>
          </div>

          {selectedDistrict ? (
            <div className="space-y-5">
              {/* DISTRICT */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                  District
                </p>

                <p className="text-xl font-bold text-blue-600">
                  {selectedDistrict.district}
                </p>
              </div>

              {/* REGION */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-1">
                  Region
                </p>

                <p className="text-base font-semibold text-gray-800">
                  {selectedDistrict.region}
                </p>
              </div>

              {/* COVERAGE */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  Covered Areas
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedDistrict.covered_area.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 shadow-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* COORDINATES */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-2">
                  Location
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">Latitude</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {selectedDistrict.latitude}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Longitude</p>
                    <p className="text-sm font-semibold text-gray-700">
                      {selectedDistrict.longitude}
                    </p>
                  </div>
                </div>
              </div>

              {/* STATUS */}
              <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Service Available
                  </p>

                  <p className="text-xs text-green-600 mt-0.5">
                    Delivery service is currently available in this area.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* EMPTY STATE */
            <div className="h-[500px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <span className="text-3xl">📍</span>
              </div>

              <h4 className="text-lg font-semibold text-gray-800">
                No District Selected
              </h4>

              <p className="text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
                Search for a district or click a region button to explore
                available service coverage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coverage;
