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

        const minChargeThreshold = 5; // 5 Amps is the slower charging mode supported

        // stop charging if target is less than threshold
        if(targetAmps < minChargeThreshold) {
            targetAmps = 0;
        }

        if (targetAmps === this.latestChargeState.ChargeAmps) {
            // no op
        } else if (targetAmps === 0 && this.latestChargeState.ChargeAmps > 0) {
            // stop
            this.vehicleClient.stopCharge();
        } else if (this.latestChargeState.ChargeAmps === 0 && targetAmps >= minChargeThreshold) {
            // start
            this.vehicleClient.startCharge();
        } else if (targetAmps >= minChargeThreshold) {
            // adjust amps
            this.vehicleClient.setChargingAmps(targetAmps);
        }

    }

}