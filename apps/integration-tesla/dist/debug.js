"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const secrets_1 = require("./secrets");
const client = new index_1.TeslaClient(secrets_1.refreshToken);
// tjs.setLogLevel(tjs.API_LOG_ALL);
const proc = async () => {
    await client.ensureAuth();
    try {
        // const vehicles = await client.listVehicles();
        // console.log(vehicles);
    }
    catch (err) {
        console.log('err', err);
        return;
    }
    const vehicle = await client.getVehicle("1493005310753046");
    await vehicle.stopCharge();
    console.log('vehicleDetails', await vehicle.vehicleDetails());
    // await vehicle.setChargingAmps(5);
    console.log('chargeState', await vehicle.chargeState());
};
proc();
