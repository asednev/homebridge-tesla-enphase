import { IvpMeter, IvpMeterReading } from 'core';
export declare class EnphaseClient {
    private axios;
    constructor(host: string, token: string);
    getIvpMeters(): Promise<IvpMeter[]>;
    getIvpMetersReadings(): Promise<IvpMeterReading[]>;
    getProductionInverters(): Promise<any>;
    private static dataOrError;
}
//# sourceMappingURL=EnphaseClient.d.ts.map