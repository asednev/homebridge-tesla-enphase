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
    async getProduction() {
        const response = await this.axios.get('/ivp/meters/readings');
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
