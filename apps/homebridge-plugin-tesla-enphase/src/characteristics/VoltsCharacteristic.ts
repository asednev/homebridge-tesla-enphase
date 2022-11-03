import { DefaultCharacteristic } from './DefaultCharacteristic';


export class VoltsCharacteristic extends DefaultCharacteristic {
    static readonly UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52';

    constructor() {
        super('Volts', VoltsCharacteristic.UUID, {
            unit: 'V',
            minStep: 0.1,
        });
    }
}
