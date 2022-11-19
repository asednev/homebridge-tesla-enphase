import { ChargeState } from ".";
export interface ITeslaVehicleClient {
    chargeState(): Promise<ChargeState>;
    setChargingAmps(amps: number): void;
}
//# sourceMappingURL=ITeslaVehicleClient.d.ts.map