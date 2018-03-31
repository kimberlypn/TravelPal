#!/bin/bash

export PORT=5106
export MIX_ENV=prod
export GIT_PATH=/home/travelpal/src/travelpal 

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "travelpal" ]; then
	echo "Error: must run as user 'travelpal'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/travelpal ]; then
	echo mv ~/www/travelpal ~/old/$NOW
	mv ~/www/travelpal ~/old/$NOW
fi

mkdir -p ~/www/travelpal
REL_TAR=~/src/travelpal/_build/prod/rel/travelpal/releases/0.0.1/travelpal.tar.gz
(cd ~/www/travelpal && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/travelpal/src/travelpal/start.sh
CRONTAB

#. start.sh
