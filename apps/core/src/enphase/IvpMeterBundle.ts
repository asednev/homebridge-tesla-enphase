import { IvpMeter, IvpMeterReading } from ".";

export class IvpMeterBundle {

    constructor(public Meters: IvpMeter[],
    public Readings: IvpMeterReading[]) {
        
    }
}