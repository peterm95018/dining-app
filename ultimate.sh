#!/bin/bash
#Aiden Hoopes, ahoopes
#Put in your dining app folder and run with "./ultimate.sh"

echo "THE ULTIMATE UPDATE FAIL SAFE"

sudo apt-get install rubygems
sudo apt-get install npm
sudo gem install compass
sudo npm install -g yo
sudo npm install -g grunt-cli
sudo npm install -g bower
sudo npm install -g generator-webapp
npm install
bower update
grunt server

