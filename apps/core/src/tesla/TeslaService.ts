import { ChargeState } from "./ChargeState";
import { ITeslaVehicleClient } from "./ITeslaVehicleClient";

export class TeslaVehicleService {

    private latestChargeState: ChargeState;

    constructor(private vehicleClient: ITeslaVehicleClient) {
        this.latestChargeState = {
            ChargeAmps: 0,
            ChargerActualCurrent: 0,
            BatteryLevel: 0,
            ChargeRate: 0,
            ChargerPilotCurrent: 0,
            ChargerVoltage: 0,
            MinutesToFullCharge: 0,
            Raw: undefined
        };
    }

    async getChargeState() {
        this.latestChargeState = await this.vehicleClient.chargeState();
        return this.latestChargeState;
    }

    setTargetChargeRate(targetAmps: number) {

        if (targetAmps === this.latestChargeState.ChargeAmps) {
            // no op
        } else if (targetAmps === 0 && this.latestChargeState.ChargeAmps > 0) {
            // stop
            console.log('TODO stop charging');
        } else if (this.latestChargeState.ChargeAmps === 0) {
            // start
            console.log('TODO start charging');
        } else {
            // adjust amps
            this.vehicleClient.setChargingAmps(targetAmps);
        }

    }

}