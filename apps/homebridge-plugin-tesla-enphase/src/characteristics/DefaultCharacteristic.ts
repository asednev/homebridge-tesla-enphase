import {
    Characteristic as CharacteristicClass,
    CharacteristicProps,
    Formats, Perms
} from "homebridge";
import { MarkOptional } from "ts-essentials";

export declare class DefaultCharacteristicClass extends CharacteristicClass {
    constructor(
        displayName: string,
        UUID: string,
        props?: MarkOptional<CharacteristicProps, 'format' | 'perms'>
    );
}

export class DefaultCharacteristic extends DefaultCharacteristicClass {
    constructor(
        displayName: string,
        UUID: string,
        props?: MarkOptional<CharacteristicProps, 'format' | 'perms'>
    ) {
        const combinedProps = {
            format: Formats.FLOAT,
            minValue: 0,
            maxValue: 65535,
            perms: [Perms.PAIRED_READ, Perms.NOTIFY],
            ...props,
        };
        super(displayName, UUID, combinedProps);
        this.value = this.getDefaultValue();
    }
};