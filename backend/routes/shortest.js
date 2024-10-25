const express = require('express');
const router = express.Router();
const ParkingSlot = require('../models/Parkingslots'); // Adjust the model import as per your actual model name

// Helper function to calculate distance between two lat/lng points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  distance = (lat2-lat1)*(lat2-lat1)+(lon1-lon2)*(lon1-lon2)
  return distance; // Distance in km
}

router.post('/findspot', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    console.log(lat,lng) // User's current or pickup location

    if (lat == null || lng == null) {
      return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }

    // Fetch all parking slots from the database
    const parkingSlots = await ParkingSlot.find({});

    if (!parkingSlots || parkingSlots.length === 0) {
      return res.status(404).json({ message: 'No parking slots found.' });
    }

    // Calculate distances and sort the parking slots
    const parkingSlotsWithDistance =[]
     parkingSlots.map((slot,idx) => {
      const distance = getDistanceFromLatLonInKm(lat, lng, slot.lat, slot.long);
      parkingSlotsWithDistance[idx]={
        id: slot._id,
        name: slot.name,
        lat: slot.lat,
        lng: slot.long,
        distance: distance,
      };
    });

    // Sort the array based on distance
    parkingSlotsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the sorted array
    res.json(parkingSlotsWithDistance);
  } catch (error) {
    console.error('Error finding parking spots:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;