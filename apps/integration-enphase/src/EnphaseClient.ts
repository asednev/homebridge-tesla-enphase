import axios, { AxiosInstance, AxiosResponse } from 'axios';
import https from 'https';

export class EnphaseClient {

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

    async getProduction() {
        const response = await this.axios.get('/ivp/meters/readings');
        return EnphaseClient.dataOrError(response);
    }

    private static dataOrError(response: AxiosResponse<any, any>) { 
        if(response.status == 200) {
            return response.data;
        }

        throw new Error(`${response.status} ${response.statusText}`);
    }
}