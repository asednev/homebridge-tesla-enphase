export interface IvpMeter {
    Id: number,
    State: MeterState,
    MeasurementType: MeasurementType
}

export enum MeterState {
    Enabled = 'enabled',
    Disabled = 'disabled'
}

export enum MeasurementType {
    Production = 'production',
    NetConsumption = 'net-consumption'
}