import { EnphaseClient } from "./EnphaseClient";
import { token } from "./secrets";

const instance = new EnphaseClient("192.168.1.94", token);

instance.getProduction().then(console.log);