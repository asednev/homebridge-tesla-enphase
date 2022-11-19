import { TeslaVehicleService } from "./TeslaService";
import { TestChargingVehicleClient } from "./test/TestChargingVehicleClient";
import { TestNotChargingVehicleClient } from "./test/TestNotChargingVehicleClient";

describe("TeslaService", () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("while charging, ", () => {
        const service = new TeslaVehicleService(new TestChargingVehicleClient());

        it("should stop charging if current less than 5 amps", async () => {

            const spy = jest.spyOn(TestChargingVehicleClient.prototype, "stopCharge");

            await service.getChargeState();
            service.setTargetChargeRate(3);

            expect(spy).toBeCalled();

        });

    });

    describe("while not charging", () => {

        const service = new TeslaVehicleService(new TestNotChargingVehicleClient());
        
        it("should start charging if current is greater than 5 amps", async () => {

            const spy = jest.spyOn(TestNotChargingVehicleClient.prototype, "startCharge");

            await service.getChargeState();
            service.setTargetChargeRate(5);

            expect(spy).toBeCalled();

        });


    });

});

