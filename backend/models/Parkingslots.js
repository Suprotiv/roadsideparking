const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;

const ParkingSlotSchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
  lat: {
    type: SchemaTypes.Double, // Use Double type from mongoose-double plugin
    required: true
  },
  long: {
    type: SchemaTypes.Double, // Use Double type from mongoose-double plugin
    required: true
  },
  // other fields in your schema...
});

const ParkingSlots = mongoose.model('parkinglot', ParkingSlotSchema);

module.exports = ParkingSlots;
