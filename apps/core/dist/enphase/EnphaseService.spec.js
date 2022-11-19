"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnphaseService_1 = require("./EnphaseService");
const IvpMeter_1 = require("./IvpMeter");
const IvpMeterBundle_1 = require("./IvpMeterBundle");
describe("EnphaseService", () => {
    const enhpaseClientMock = jest.mock("./IEnphaseClient");
    const service = new EnphaseService_1.EnphaseService(enhpaseClientMock);
    it('should map production readings', () => {
        const bundle = new IvpMeterBundle_1.IvpMeterBundle([
            { Id: 1, MeasurementType: IvpMeter_1.MeasurementType.Production, State: IvpMeter_1.MeterState.Enabled }
        ], [
            { Id: 1, Timestamp: new Date(), ActivePower: 42, Voltage: 24, Current: 2, }
        ]);
        const production = service.calculateProductionPower(bundle);
        const actualPower = production.Power;
        expect(actualPower).toBe(42);
    });
    it('should return 0 when no producing', () => {
        const bundle = new IvpMeterBundle_1.IvpMeterBundle([], []);
        const production = service.calculateProductionPower(bundle);
        const actualPower = production.Power;
        expect(actualPower).toBe(0);
    });
});
