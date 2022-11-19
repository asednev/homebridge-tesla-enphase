import { EnphaseService } from "./EnphaseService";
import { IEnphaseClient } from "./IEnphaseClient";
import { MeasurementType, MeterState } from "./IvpMeter";
import { IvpMeterBundle } from "./IvpMeterBundle";

describe("EnphaseService", () => {

    const enhpaseClientMock = jest.mock("./IEnphaseClient") as unknown as IEnphaseClient;
    const service = new EnphaseService(enhpaseClientMock);

    it('should map production readings', () => {

        const bundle = new IvpMeterBundle([
            { Id: 1, MeasurementType: MeasurementType.Production, State: MeterState.Enabled }
        ], [
            { Id: 1, Timestamp: new Date(), ActivePower: 42, Voltage: 24, Current: 2, }
        ]);

        const production = service.calculateProductionPower(bundle)
        const actualPower = production.Power;

        expect(actualPower).toBe(42);

    });

    it('should return 0 when no producing', () => {
        const bundle = new IvpMeterBundle([], []);

        const production = service.calculateProductionPower(bundle)
        const actualPower = production.Power;
        
        expect(actualPower).toBe(0);
    });

});

