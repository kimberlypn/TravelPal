#!/bin/sh
sudo apt-get update  # To get the latest package lists
echo Current Python3 version is # Python should come preloaded with ubuntu
python3 -V

sudo apt-get install python3-pip3 # install pip for package management
pip install --upgrade pip
pip install requests # for fetching requests
pip install beautifulsoup4 # for parsing responses



#
