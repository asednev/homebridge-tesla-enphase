"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnphaseClient_1 = require("./EnphaseClient");
const secrets_1 = require("./secrets");
const instance = new EnphaseClient_1.EnphaseClient("192.168.1.94", secrets_1.token);
const proc = async () => {
    const meters = await instance.getIvpMeters();
    console.log('meters', meters);
    const readings = await instance.getIvpMetersReadings();
    console.log('readings', readings);
};
proc();
