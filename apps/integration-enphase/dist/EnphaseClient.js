"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnphaseClient = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
class EnphaseClient {
    axios;
    constructor(host, token) {
        this.axios = axios_1.default.create({
            baseURL: `https://${host}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'json',
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false // Enphase IQ Gateway provides self-signed SSL certificate
            })
        });
    }
    async getIvpMeters() {
        const response = await this.axios.get('/ivp/meters');
        const data = EnphaseClient.dataOrError(response);
        if (!Array.isArray(data)) {
            throw new Error('Invalid shape of response: /ivp/meters');
        }
        return data.map(x => ({
            Id: x.eid,
            State: x.state,
            MeasurementType: x.measurementType,
        }));
    }
    async getIvpMetersReadings() {
        const response = await this.axios.get('/ivp/meters/readings');
        const data = EnphaseClient.dataOrError(response);
        if (!Array.isArray(data)) {
            throw new Error('Invalid shape of response: /ivp/meters/readings');
        }
        return data.map(x => ({
            Id: x.eid,
            Timestamp: new Date(x.timestamp * 1000),
            ActivePower: x.activePower,
            Voltage: x.voltage,
            Current: x.current,
        }));
    }
    async getProductionInverters() {
        const response = await this.axios.get('/api/v1/production/inverters');
        return EnphaseClient.dataOrError(response);
    }
    static dataOrError(response) {
        if (response.status == 200) {
            return response.data;
        }
        throw new Error(`${response.status} ${response.statusText}`);
    }
}
exports.EnphaseClient = EnphaseClient;
