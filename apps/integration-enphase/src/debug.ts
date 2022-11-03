import { EnphaseClient } from "./EnphaseClient";
import { token } from "./secrets";

const instance = new EnphaseClient("192.168.1.94", token);

const proc = async () => {
    
    const meters = await instance.getIvpMeters();
    console.log('meters', meters);

    const readings = await instance.getIvpMetersReadings();
    console.log('readings', readings);
    
}
proc();