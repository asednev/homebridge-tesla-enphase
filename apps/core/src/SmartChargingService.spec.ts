import { ChargeState, ITeslaVehicleClient, TeslaVehicleService } from "./tesla";
import { EnphaseService } from "./enphase/EnphaseService";
import { MeasurementType, MeterState } from "./enphase/IvpMeter";
import { IvpMeterBundle } from "./enphase/IvpMeterBundle";
import { SmartChargingOptions, SmartChargingService } from "./SmartCharingService";
import { IEnphaseClient } from "./enphase";

describe("SmartChargingService", () => {

    const enhpaseClientMock = jest.mock("./enphase/IEnphaseClient") as unknown as IEnphaseClient;
    const vehicleClientMock = jest.mock("./tesla/ITeslaVehicleClient") as unknown as ITeslaVehicleClient;

    const enphaseService = new EnphaseService(enhpaseClientMock);
    const teslaVehicleService = new TeslaVehicleService(vehicleClientMock);
    const options = new SmartChargingOptions();

    const service = new SmartChargingService(enphaseService,
        teslaVehicleService,
        options);

    describe("calculateProductionPower", () => {

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

            // add an offset of 200W
            const actualAmpsWithOffset = service.calculateRecommendedAmps(teslaChargeState, enphaseMeterBundle, 500);

            // 500W / 240V = 2.5 A
            // 21.8 - 2.5 = 19.3
            // floor(19.3) = 19
            expect(actualAmpsWithOffset).toBe(19);

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

});