"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleClient = void 0;
const tjs = __importStar(require("teslajs"));
class VehicleClient {
    teslaClient;
    vehicleId;
    constructor(teslaClient, vehicleId) {
        this.teslaClient = teslaClient;
        this.vehicleId = vehicleId;
    }
    getOptions() {
        return this.teslaClient.getOptions(this.vehicleId);
    }
    async vehicleDetails() {
        const vehicle = await tjs.vehicleAsync(this.getOptions());
        return vehicle;
    }
    async chargeState() {
        const chargeState = await tjs.chargeStateAsync(this.getOptions());
        return {
            BatteryLevel: chargeState.battery_level,
            ChargeAmps: chargeState.charge_amps,
            ChargeRate: chargeState.charge_rate,
            ChargerActualCurrent: chargeState.charger_actual_current,
            ChargerPilotCurrent: chargeState.charger_pilot_current,
            ChargerVoltage: chargeState.charger_voltage,
            MinutesToFullCharge: chargeState.minutes_to_full_charge,
            Raw: chargeState
        };
    }
    async setChargingAmps(amps) {
        await tjs.post_commandAsync(this.getOptions(), "command/set_charging_amps", { charging_amps: amps });
    }
}
exports.VehicleClient = VehicleClient;
