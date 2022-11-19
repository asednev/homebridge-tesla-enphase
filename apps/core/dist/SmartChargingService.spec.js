"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tesla_1 = require("./tesla");
const EnphaseService_1 = require("./enphase/EnphaseService");
const IvpMeter_1 = require("./enphase/IvpMeter");
const SmartCharingService_1 = require("./SmartCharingService");
describe("SmartChargingService", () => {
    const enhpaseClientMock = jest.mock("./enphase/IEnphaseClient");
    const vehicleClientMock = jest.mock("./tesla/ITeslaVehicleClient");
    const enphaseService = new EnphaseService_1.EnphaseService(enhpaseClientMock);
    const teslaVehicleService = new tesla_1.TeslaVehicleService(vehicleClientMock);
    const options = new SmartCharingService_1.SmartChargingOptions();
    const service = new SmartCharingService_1.SmartChargingService(enphaseService, teslaVehicleService, options);
    describe("calculateProductionPower", () => {
        it('should calculate recommended amps', () => {
            // vehicle is charging at 240V 20A (4800 Wh)
            const teslaChargeState = {
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
            const enphaseMeterBundle = {
                Meters: [
                    { Id: 1, MeasurementType: IvpMeter_1.MeasurementType.Production, State: IvpMeter_1.MeterState.Enabled },
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
            // add an offset of 200W
            const actualAmpsWithOffset = service.calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle, 500);
            // 500W / 240V = 2.5 A
            // 21.8 - 2.5 = 19.3
            // floor(19.3) = 19
            expect(actualAmpsWithOffset).toBe(19);
        });
        it('should return 0 when no solar production', () => {
            // vehicle is charging at 240V 20A (4800 Wh)
            const teslaChargeState = {
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
            const enphaseMeterBundle = {
                Meters: [],
                Readings: []
            };
            const actualAmps = service.calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle);
            expect(actualAmps).toBe(0);
        });
    });
});
