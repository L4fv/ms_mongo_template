const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const BookSchema = new Schema({
//   id: { type: String },
//   start: {
//     time: { type: Number },
//     lat: { type: Number },
//     lon: { type: Number },
//     address: { type: String }
//   },
//   end: {
//     time: { type: Number },
//     lat: { type: Number },
//     lon: { type: Number },
//     address: { type: String }
//   },
//   distance: { type: Number },
//   duration: { type: Number },
//   overspeedsCount: { type: Number },
//   boundingBox: [BookSchema]
// });
// const mapSchema = new Schema(
//   {
//     name: {
//       type: String
//     },
//     description: {
//       type: String
//     },
//     rate: {
//       type: Number,
//       default: 0
//     },
//     sumOfRates: {
//       type: Number,
//       default: 0
//     },
//     places: [subSchema]
//   },
//   {
//     timestamps: true
//   }
// );

const subSchema = new Schema({
  lat: {
    type: Number
  },
  lon: {
    type: Number
  }
});
const BookSchema = new Schema({
  start: {
    time: { type: Number, required: true },
    lat: { type: Number },
    lon: { type: Number },
    address: { type: String }
  },
  end: {
    time: { type: Number, required: true },
    lat: { type: Number },
    lon: { type: Number },
    address: { type: String }
  },
  distance: { type: Number },
  duration: { type: Number },
  overspeedsCount: { type: Number },
  boundingBox: [subSchema]
});

module.exports = mongoose.model("Book", BookSchema);
