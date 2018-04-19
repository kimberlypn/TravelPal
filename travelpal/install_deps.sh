#!/bin/bash

if [ $UID != 0 ]
then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi

apt-get update  # To get the latest package lists
echo Current Python3 version is # Python should come preloaded with ubuntu
python3 -V


# shouldn't need to add sudo, but commands throwing errors about permission when excluded
apt-get install python3-pip # install pip for package management
sudo -H pip3 install --upgrade pip
sudo -H pip3 install requests # for fetching requests
sudo -H pip3 install beautifulsoup4 # for parsing responses
sudo -H pip3 install html5lib # parser dependency

# postgres dependecies
sudo -H pip3 install psycopg2


# uncomment line below for pyasn1 module errors
# sudo apt-get --reinstall install python3-pyasn1 python3-pyasn1-modules 

#
