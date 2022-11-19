import axios, { AxiosInstance, AxiosResponse } from 'axios';
import https from 'https';
import { IvpMeter, IvpMeterReading, IEnphaseClient } from 'core';

export class EnphaseClient implements IEnphaseClient {

    private axios: AxiosInstance;

    constructor(host: string,
        token: string) {

        this.axios = axios.create({
            baseURL: `https://${host}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'json',
            httpsAgent: new https.Agent({
                rejectUnauthorized: false // Enphase IQ Gateway provides self-signed SSL certificate
            })
        });
    }

    async getIvpMeters(): Promise<IvpMeter[]> {
        const response = await this.axios.get('/ivp/meters');
        const data = EnphaseClient.dataOrError(response);

        if (!Array.isArray(data)) {
            throw new Error('Invalid shape of response: /ivp/meters');
        }

        return data.map(x => <IvpMeter>{
            Id: x.eid,
            State: x.state,
            MeasurementType: x.measurementType,
        });
    }

    async getIvpMetersReadings(): Promise<IvpMeterReading[]> {
        const response = await this.axios.get('/ivp/meters/readings');
        const data = EnphaseClient.dataOrError(response);

        if (!Array.isArray(data)) {
            throw new Error('Invalid shape of response: /ivp/meters/readings');
        }

        return data.map(x => <IvpMeterReading>{
            Id: x.eid,
            Timestamp: new Date(x.timestamp * 1000),
            ActivePower: x.activePower,
            Voltage: x.voltage,
            Current: x.current,
        });
    }

    async getProductionInverters() {
        const response = await this.axios.get('/api/v1/production/inverters');
        return EnphaseClient.dataOrError(response);
    }

    private static dataOrError(response: AxiosResponse<any, any>) {
        if (response.status == 200) {
            return response.data;
        }

        throw new Error(`${response.status} ${response.statusText}`);
    }
}