import * as tjs from 'teslajs';
import { ChargeState, ITeslaVehicleClient } from 'core';
import { TeslaClient } from './TeslaClient';

export class VehicleClient implements ITeslaVehicleClient {

    constructor(private teslaClient: TeslaClient, private vehicleId: string) {
    }

    private getOptions() {
        return this.teslaClient.getOptions(this.vehicleId);
    }

    async vehicleDetails() {
        const vehicle = await tjs.vehicleAsync(this.getOptions());
        return vehicle;
    }

    async chargeState(): Promise<ChargeState> {
        const chargeState = await tjs.chargeStateAsync(this.getOptions()) as any;
        return {
            BatteryLevel: chargeState.battery_level,
            ChargeAmps: chargeState.charge_amps,
            ChargeRate: chargeState.charge_rate,
            ChargerActualCurrent: chargeState.charger_actual_current,
            ChargerPilotCurrent: chargeState.charger_pilot_current,
            ChargerVoltage: chargeState.charger_voltage,
            MinutesToFullCharge: chargeState.minutes_to_full_charge,
            Raw: chargeState
        }
    }
    
    async setChargingAmps(amps: number) {
        await tjs.post_commandAsync(this.getOptions(), "command/set_charging_amps", { charging_amps: amps });
    }
}