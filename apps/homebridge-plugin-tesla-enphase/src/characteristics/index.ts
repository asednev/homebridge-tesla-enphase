import type {
    Characteristic as CharacteristicClass,
    WithUUID,
  } from 'homebridge';
  
import { VoltsCharacteristic } from './VoltsCharacteristic';

export * from "./VoltsCharacteristic";

export default function characteristic(
    Characteristic: typeof CharacteristicClass
  ): Record<
    // | 'Amperes'
    // | 'KilowattHours'
    // | 'KilowattVoltAmpereHour'
    // | 'VoltAmperes'
    | 'Volts',
    // | 'Watts',
    WithUUID<new () => CharacteristicClass>
  > {

    //const defaultCharacteristic = DefaultCharacteristic(Characteristic);
  
    return {
        Volts: VoltsCharacteristic,
      // Amperes: AmperesImport(DefaultCharacteristic),
      // KilowattHours: KilowattHoursImport(DefaultCharacteristic),
      // KilowattVoltAmpereHour: KilowattVoltAmpereHourImport(DefaultCharacteristic),
      // VoltAmperes: VoltAmperesImport(DefaultCharacteristic),
      // Volts: VoltsImport(DefaultCharacteristic),
      // Watts: WattsImport(DefaultCharacteristic),
    };
  }

;