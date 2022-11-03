export interface IvpMeter {
    Id: number;
    State: MeterState;
    MeasurementType: MeasurementType;
}
export declare enum MeterState {
    Enabled = "enabled",
    Disabled = "disabled"
}
export declare enum MeasurementType {
    Production = "production",
    NetConsumption = "net-consumption"
}
//# sourceMappingURL=IvpMeter.d.ts.map