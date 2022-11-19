import { ChargeState } from "../ChargeState";
import { ITeslaVehicleClient } from "../ITeslaVehicleClient";

export class TestNotChargingVehicleClient extends ITeslaVehicleClient {
    chargeState(): Promise<ChargeState> {
        return Promise.resolve({
            ChargeAmps: 0,
            BatteryLevel: 90,
            ChargerActualCurrent: 0,
            ChargeRate: 0,
            ChargerVoltage: 0,
            ChargerPilotCurrent: 0,
            MinutesToFullCharge: 0,
            Raw: undefined
        });
    }
    setChargingAmps(amps: number): void {
    }
    startCharge(): void {
    }
    stopCharge(): void {
    }
}
