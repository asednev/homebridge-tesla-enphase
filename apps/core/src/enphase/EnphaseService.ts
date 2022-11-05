import { MeasurementType, MeterState } from "./IvpMeter";
import { IvpMeterBundle } from "./IvpMeterBundle";

export class EnphaseService {

    public static NoProduction = {
        Power: 0,
        Voltage: 0,
        Current: 0
    };

    getProduction(bundle: IvpMeterBundle) {
        const productionMeters = bundle.Meters.filter(x => x.MeasurementType === MeasurementType.Production &&
            x.State === MeterState.Enabled);
            
        if(productionMeters.length === 0) {
            return EnphaseService.NoProduction;
        }

        const productionMeter = productionMeters[0];

        const productionReadings = bundle.Readings.filter(x => x.Id === productionMeter.Id);

        if(productionReadings.length === 0) { 
            return EnphaseService.NoProduction;
        }

        const reading = productionReadings[0];

        return {
            Power: reading.ActivePower,
            Voltage: reading.Voltage,
            Current: reading.Current
        }
    }
}