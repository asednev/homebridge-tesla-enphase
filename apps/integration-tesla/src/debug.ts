import { TeslaClient } from "./index";
import { authToken } from "./secrets";

const client = new TeslaClient(authToken);

// tjs.setLogLevel(tjs.API_LOG_ALL);

const proc = async () => {
    
    const vehicles = await client.listVehicles();
    console.log(vehicles);

    const vehicle = await client.getVehicle("1493005310753046");
    console.log(await vehicle.vehicleDetails());

    console.log(await vehicle.chargeState());

};
proc();