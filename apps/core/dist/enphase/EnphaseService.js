"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnphaseService = void 0;
const IvpMeter_1 = require("./IvpMeter");
class EnphaseService {
    static NoProduction = {
        Power: 0,
        Voltage: 0,
        Current: 0
    };
    getProduction(bundle) {
        const productionMeters = bundle.Meters.filter(x => x.MeasurementType === IvpMeter_1.MeasurementType.Production &&
            x.State === IvpMeter_1.MeterState.Enabled);
        if (productionMeters.length === 0) {
            return EnphaseService.NoProduction;
        }
        const productionMeter = productionMeters[0];
        const productionReadings = bundle.Readings.filter(x => x.Id === productionMeter.Id);
        if (productionReadings.length === 0) {
            return EnphaseService.NoProduction;
        }
        const reading = productionReadings[0];
        return {
            Power: reading.ActivePower,
            Voltage: reading.Voltage,
            Current: reading.Current
        };
    }
}
exports.EnphaseService = EnphaseService;
