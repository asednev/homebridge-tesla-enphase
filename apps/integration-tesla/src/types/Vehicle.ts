import { VehicleState } from "./VehicleState";

export interface Vehicle {
    VehicleId: string;
    Vin: string;
    DisplayName: string;
    State: VehicleState;
    Raw: any;
}
