import { ChargeState } from ".";

export abstract class ITeslaVehicleClient {
    abstract chargeState(): Promise<ChargeState>;
    abstract setChargingAmps(amps: number): void;
    abstract startCharge(): void;
    abstract stopCharge(): void;
}