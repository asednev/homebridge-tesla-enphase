"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const secrets_1 = require("./secrets");
const client = new index_1.TeslaClient(secrets_1.refreshToken);
// tjs.setLogLevel(tjs.API_LOG_ALL);
const proc = async () => {
    await client.ensureAuth();
    // const vehicles = await client.listVehicles();
    // console.log(vehicles);
    const vehicle = await client.getVehicle("1493005310753046");
    //console.log(await vehicle.vehicleDetails());
    console.log(await vehicle.chargeState());
};
proc();
