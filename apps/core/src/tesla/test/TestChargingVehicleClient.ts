import { ChargeState } from "../ChargeState";
import { ITeslaVehicleClient } from "../ITeslaVehicleClient";

export class TestChargingVehicleClient extends ITeslaVehicleClient {
    chargeState(): Promise<ChargeState> {
        return Promise.resolve({
            ChargeAmps: 10,
            BatteryLevel: 90,
            ChargerActualCurrent: 10,
            ChargeRate: 10,
            ChargerVoltage: 10,
            ChargerPilotCurrent: 10,
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
