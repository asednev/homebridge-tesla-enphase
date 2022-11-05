import { ChargeState } from "../tesla";
import { EnphaseService } from "./EnphaseService";
import { MeasurementType, MeterState } from "./IvpMeter";
import { IvpMeterBundle } from "./IvpMeterBundle";
import { SmartChargingService } from "./SmartCharingService";

describe("SmartChargingService", () => {

    const enphaseService = new EnphaseService();
    const service = new SmartChargingService(enphaseService);

    it('should calculate recommended amps', () => {

        // vehicle is charging at 240V 20A (4800 Wh)
        const teslaChargeState: ChargeState = {
            BatteryLevel: 42,
            ChargerActualCurrent: 20,
            ChargeAmps: 18.7,
            ChargeRate: 1500,
            ChargerVoltage: 240,
            ChargerPilotCurrent: 24,
            MinutesToFullCharge: 1000,
            Raw: undefined
        };

        // solar produces at 5400 Wh,
        const enphaseMeterBundle: IvpMeterBundle = {
            Meters: [
                { Id: 1, MeasurementType: MeasurementType.Production, State: MeterState.Enabled },
            ],
            Readings: [
                { Id: 1, ActivePower: 5236, Current: 22, Voltage: 238, Timestamp: new Date() },
            ]
        };

        const actualAmps = service.calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle);

        // Max(240, 238) = 240
        // 5236 / 240 = 21.8
        // floor(21.8) = 21
        expect(actualAmps).toBe(21);

    });

    it('should return 0 when no solar production', () => {
        // vehicle is charging at 240V 20A (4800 Wh)
        const teslaChargeState: ChargeState = {
            BatteryLevel: 42,
            ChargerActualCurrent: 20,
            ChargeAmps: 18.7,
            ChargeRate: 1500,
            ChargerVoltage: 240,
            ChargerPilotCurrent: 24,
            MinutesToFullCharge: 1000,
            Raw: undefined
        };

        // no solar production
        const enphaseMeterBundle: IvpMeterBundle = {
            Meters: [],
            Readings: []
        };

        const actualAmps = service.calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle);

        expect(actualAmps).toBe(0);

    });

});