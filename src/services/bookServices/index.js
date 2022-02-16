//const client = require("../../helpers/RedisConnection");
const Book = require("../../database/models/BookModel");
const Logger = require("../../helpers/Logger");
const BussinesError = require("../../contants/BussinesError");
const axios = require("axios");
const { SERVER_ERROR } = require("../../contants/ErrorConstant");
const {
  INTERNAL_SERVER_ERROR_STATUS
} = require("../../contants/HttpConstants");
const createBook = async ({ body }) => {
  try {
    const readingFin = body.readings.length;
    const detalleGeo = {
      tiempo1: body.readings[0].time,
      tiempo2: body.readings[readingFin - 1].time,
      latitud1: body.readings[0].location.lat,
      latitud2: body.readings[readingFin - 1].location.lat,
      longitud1: body.readings[0].location.lon,
      longitud2: body.readings[readingFin - 1].location.lon
    };
    const arrayLocation = [];

    async function localizar(latitud, longitud) {
      const { data } = await axios({
        baseURL: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&sensor=true&key=${process.env.GOOGLE_MAPS_API_KEY}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return data.results[0].formatted_address;
    }
    for (const iterator of body.readings) {
      arrayLocation.push(iterator.location);
    }
    console.log("arrayLocation", arrayLocation);
    function getDistanciaMetros(lat1, lon1, lat2, lon2) {
      rad = function (x) {
        return (x * Math.PI) / 180;
      };
      var R = 6378.137; //Radio de la tierra en km
      var dLat = rad(lat2 - lat1);
      var dLong = rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
          Math.cos(rad(lat2)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      //aquí obtienes la distancia en metros por la conversion 1Km =1000m
      var d = R * c * 10;
      return d;
    }
    const inicio = await localizar(detalleGeo.latitud1, detalleGeo.longitud1);
    const final = await localizar(detalleGeo.latitud2, detalleGeo.longitud2);
    console.log("pruebafffffffffffffff");
    const detalleTrack = new Book({
      start: {
        time: detalleGeo.tiempo1,
        lat: detalleGeo.latitud1,
        lon: detalleGeo.longitud1,
        address: inicio
      },
      end: {
        time: detalleGeo.tiempo2,
        lat: detalleGeo.latitud2,
        lon: detalleGeo.longitud2,
        address: final
      },
      distance: Number(
        getDistanciaMetros(
          detalleGeo.latitud1,
          detalleGeo.longitud1,
          detalleGeo.latitud2,
          detalleGeo.longitud2
        ).toFixed(1)
      ),
      duration: detalleGeo.tiempo2 - detalleGeo.tiempo1,
      overspeedsCount: Number(
        ((detalleGeo.tiempo2 - detalleGeo.tiempo1) / 36000).toFixed(0)
      ),
      boundingBox: arrayLocation
    });
    console.log(detalleTrack);
    return await detalleTrack.save();
  } catch (error) {
    throw new BussinesError({
      code: SERVER_ERROR.code,
      httpCode: INTERNAL_SERVER_ERROR_STATUS.code,
      messages: [SERVER_ERROR.message]
      // traceError:      ,
      // errorSource: ,
      // reason:
    });
  }
};
const getBooks = async payload => {
  try {
    //filtro descendente para inicio del viaje respecto al tiempo
    let filtroAplicado;

    console.log("body", payload.tipoFiltro);
    const valor = Number(payload.valor);
    switch (payload.tipoFiltro) {
      case "start_gte":
        console.log("start_gte");
        filtroAplicado = await Book.find()
          .skip(valor)
          .sort({ "start.time": 1 });
        break;
      case "start_lte":
        console.log("start_lte");

        filtroAplicado = await Book.find()
          .skip(valor)
          .sort({ "start.time": -1 });
        break;
      case "distance_gte":
        console.log("distance_gte");

        filtroAplicado = await Book.find().skip(valor).sort({ distance: 1 });
        break;
      case "limit":
        console.log("limit");
        filtroAplicado = await Book.find().limit(valor);
        break;
      case "offset":
        console.log("offset");
        filtroAplicado = await Book.find().skip(valor);
        break;
    }
    console.log("filtroAplicado", filtroAplicado);

    return await filtroAplicado;
  } catch (error) {}
};

module.exports = {
  createBook,
  getBooks
};
