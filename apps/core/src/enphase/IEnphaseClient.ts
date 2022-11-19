import { IvpMeter } from "./IvpMeter";
import { IvpMeterReading } from "./IvpMeterReading";

export interface IEnphaseClient {
    getIvpMeters(): Promise<IvpMeter[]>;
    getIvpMetersReadings(): Promise<IvpMeterReading[]>;
}