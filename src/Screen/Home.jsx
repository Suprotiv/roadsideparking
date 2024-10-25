import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import Navbar from '../Components/Navbar';
import About from '../Components/About';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

function Home() {
  const API_URL = 'http://localhost:4000';
  const [pickup, setPickup] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState({ lat: 0, lng: 0 });
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const mapRef = React.useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [mapPopup, setMapPopup] = useState(false);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [error, setError] = useState('');
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);


  // Fetch current location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => console.error('Error getting current location:', error),
      { enableHighAccuracy: true }
    );
  }, []);

  // Geocode pickup location to coordinates
  const geocodePickupLocation = async () => {
    if (!pickup) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(pickup)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
    } catch (error) {
      console.error('Error in geocoding:', error);
    }
  };

  // Calculate route to the first parking spot
  const calculateRoute = async (coordinates, parkingSpots) => {
    if (!parkingSpots || parkingSpots.length === 0) return;

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: coordinates,
      destination: parkingSpots[0], // First parking spot
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        setDirections(result);
        const duration = result.routes[0].legs[0].duration.text;
        setDuration(duration);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const fetchParking = async (location) => {
    try {
      if (currentLocation.lat !== 0) {
        const response = await axios.post(`${API_URL}/api/shortest/findspot`, location);
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.error('Error fetching parking spots:', error);
    }
  };
  const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => reject(error),
        { enableHighAccuracy: true }
      );
    });
  };
  

  const currentLocationFetch = async () => {
   
    setLoading1(true);
    await setMapPopup(true);
    const location=await fetchCurrentLocation()
    const data = await fetchParking(location);
    console.log(location,data)
    setIsCalculatingRoute(true);
    setTimeout(() => {
      calculateRoute(location, data);
      setIsCalculatingRoute(false);
    }, 4000);
    setLoading1(false);
  };

  const handleFindParking = async () => {
    if (!pickup) {
      setError('Pickup location is required');
      return;
    }
    setLoading(true);
    await setMapPopup(true);
    const newCoordinates = await geocodePickupLocation();

    if (newCoordinates) {
      const data = await fetchParking(newCoordinates);
      setCurrentLocation(newCoordinates);
      setMapLoaded(true);
      setIsCalculatingRoute(true);
      setTimeout(() => {
        calculateRoute(newCoordinates, data);
        setIsCalculatingRoute(false);
      }, 4000);
      setError(''); // Clear error if there is input
    }

    setLoading(false);
  };

  const closeMapPopup = () => {
    setMapPopup(false);
  };

  return (
    <div>
     
      <Navbar aboutRef={aboutRef} servicesRef={servicesRef} />
      <section ref={servicesRef} className="min-h-screen">
      <div className="min-h-screen flex">

        <div className="bg-black  text-white flex-1 flex flex-col justify-center px-10">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Find the nearest Parking </h1>
          <div className='flex gap-3'>
          <p className="text-lg mb-8 animate-fadeIn">Anywhere . </p>
          <p className="text-lg mb-8 animate-fadeIn">Anytime </p>
          </div>

          <div className="space-y-4 animate-fadeIn">
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter location"
              className={`w-full p-4 text-black rounded-lg focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-4 animate-fadeIn">
              <button
                className="bg-white text-black font-bold py-3 transition-all duration-500 px-6 rounded-lg hover:bg-gray-300 "
                onClick={handleFindParking}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Find Parking'}
              </button>
              <button
                className="bg-white text-black font-bold py-3 transition-all duration-500 px-6 rounded-lg hover:bg-gray-300 "
                onClick={currentLocationFetch}
                disabled={loading1}
              >
                {loading1 ? 'Loading...' : 'Get Current Location'}
              </button>
            </div>

            {duration && (
              <p className="mt-4 text-white animate-fadeIn  ">
                Estimated time to reach: <span className="font-bold">{duration}</span>
              </p>
            )}
          </div>
        </div>
      

        <div className="hidden lg:flex flex-1 bg-black items-center justify-center ">
          {!mapPopup ? (
            <img
              src="bg2.webp"
              alt="Map Preview"
              className="rounded-2xl shadow-lg object-cover h-[85vh] w-[85vh] p-10 animate-fadeIn"
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg  z-20 h-screen w-full relative ">
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={currentLocation}
                  zoom={18}
                  onLoad={(map) => (mapRef.current = map)}
                >
                  <Marker
                    position={currentLocation}
                    options={{
                      icon: {
                        url: 'https://img.icons8.com/color/48/000000/car.png',
                      },
                    }}
                  />
                  {directions && <DirectionsRenderer directions={directions} />}

                  {isCalculatingRoute && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="text-white text-xl">Calculating route...</div>
                    </div>
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          )}
        </div>
      </div>
      </section>

      <section ref={aboutRef} className="">

        <About />
        </section>
    </div>
  );
}

export default Home;
