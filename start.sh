#!/bin/bash

export PORT=5106

cd ~/www/travelpal
./bin/travelpal stop || true
./bin/travelpal start
