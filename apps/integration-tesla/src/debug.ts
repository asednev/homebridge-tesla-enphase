import * as tjs from 'teslajs';
import { TeslaClient } from "./index";
import { refreshToken } from "./secrets";

const client = new TeslaClient(refreshToken);

// tjs.setLogLevel(tjs.API_LOG_ALL);

const proc = async () => {

    await client.ensureAuth();

    try {
        // const vehicles = await client.listVehicles();
        // console.log(vehicles);
    } catch (err) {
        console.log('err', err);
        return;
    }


    const vehicle = await client.getVehicle("1493005310753046");

    console.log('vehicleDetails', await vehicle.vehicleDetails());

    // await vehicle.setChargingAmps(5);

    console.log('chargeState', await vehicle.chargeState());

    

};
proc();