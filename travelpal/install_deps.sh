#!/bin/sh
apt-get update  # To get the latest package lists
echo Current Python3 version is # Python should come preloaded with ubuntu
python3 -V

apt-get install python3-pip # install pip for package management
sudo -H pip3 install --upgrade pip
pip3 install requests # for fetching requests
pip3 install beautifulsoup4 # for parsing responses
pip3 install html5lib # parser dependency

# uncomment line below for pyasn1 module errors
# sudo apt-get --reinstall install python3-pyasn1 python3-pyasn1-modules 

#
