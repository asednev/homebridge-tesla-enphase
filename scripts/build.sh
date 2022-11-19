#!/bin/bash

[[ "$PWD" =~ scripts ]] && cd ..
cd apps/

cd integration-enphase
npm run build
cd ..

cd integration-tesla
npm run build
cd ..

cd core
npm run build
cd ..

cd homebridge-plugin-tesla-enphase
npm run build
cd ..