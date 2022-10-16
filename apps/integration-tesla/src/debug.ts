import * as tjs from 'teslajs';
import { TeslaClient } from "./index";
import { refreshToken } from "./secrets";

const client = new TeslaClient(refreshToken);

tjs.setLogLevel(tjs.API_LOG_ALL);

const proc = async () => {
    
    await client.ensureAuth();
    
    // const vehicles = await client.listVehicles();
    // console.log(vehicles);
    
    
    const vehicle = await client.getVehicle("1493005310753046");
    //console.log(await vehicle.vehicleDetails());

    // await vehicle.setChargingAmps(5);

    console.log(await vehicle.chargeState());
    

};
proc();