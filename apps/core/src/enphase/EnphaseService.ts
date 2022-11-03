import { MeasurementType, MeterState } from "./IvpMeter";
import { IvpMeterBundle } from "./IvpMeterBundle";

export class EnphaseService {


    getProductionPower(bundle: IvpMeterBundle): number {
        const productionMeters = bundle.Meters.filter(x => x.MeasurementType === MeasurementType.Production &&
            x.State === MeterState.Enabled);
            
        if(productionMeters.length === 0) {
            return 0;
        }

        const productionMeter = productionMeters[0];

        const productionReadings = bundle.Readings.filter(x => x.Id === productionMeter.Id);

        if(productionReadings.length === 0) { 
            return 0;
        }

        return productionReadings[0].ActivePower;
    }
}