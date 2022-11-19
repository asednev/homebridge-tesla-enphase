import { IEnphaseClient } from "./IEnphaseClient";
import { MeasurementType, MeterState } from "./IvpMeter";
import { IvpMeterBundle } from "./IvpMeterBundle";

export class EnphaseService {

    constructor(private enphaseClient: IEnphaseClient) {

    }

    public static NoProduction = {
        Power: 0,
        Voltage: 0,
        Current: 0
    };

    async getCurrentProduction(): Promise<IvpMeterBundle> {

        try {

            const meters = await this.enphaseClient.getIvpMeters();
            const readings = await this.enphaseClient.getIvpMetersReadings();
    
            const enphaseBundle = new IvpMeterBundle(meters, readings);
            return enphaseBundle;

        } catch(err) {
            return {
                Meters: [],
                Readings: []
            }
        }

    }

    calculateProductionPower(bundle: IvpMeterBundle) {
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