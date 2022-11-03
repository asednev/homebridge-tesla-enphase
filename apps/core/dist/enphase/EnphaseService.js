"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnphaseService = void 0;
const IvpMeter_1 = require("./IvpMeter");
class EnphaseService {
    getProductionPower(bundle) {
        const productionMeters = bundle.Meters.filter(x => x.MeasurementType === IvpMeter_1.MeasurementType.Production &&
            x.State === IvpMeter_1.MeterState.Enabled);
        if (productionMeters.length === 0) {
            return 0;
        }
        const productionMeter = productionMeters[0];
        const productionReadings = bundle.Readings.filter(x => x.Id === productionMeter.Id);
        if (productionReadings.length === 0) {
            return 0;
        }
        return productionReadings[0].ActivePower;
    }
}
exports.EnphaseService = EnphaseService;
