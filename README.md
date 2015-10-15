# Project Name

[![Coverage Status](https://coveralls.io/repos/Insuperable-Arete/cerberus/badge.svg?branch=master&service=github)](https://coveralls.io/github/Insuperable-Arete/cerberus?branch=master)

## Description
Cerfer.us is a data service and visualization app of California coastal weather conditions for surfers. The front end, powered by the Google Maps API, AngularJS, and D3.js, provides advanced search and data services for surfers looking for the best waves and beaches closest to them. The data is served by a Node.js/Express-powered back end.


## Table of Contents

1. [Team](#team)
2. [Development](#development)
3. [Usage](#Usage)
4. [Requirements](#requirements)
5. [Contributing](#contributing)



## Team
  - __Product Owner__: Justin Thareja
  - __Scrum Master__: Justin Fong
  - __Development Team Members__: Jake Seiden, James Robinson


## Installing Dependencies
	From within the root directory:

	sudo npm install -g bower
	npm install
	bower install


## Usage

	1) See "Installing Dependencies"
	2) Start 'worker.js' in './backend/worker' using 'node'. This command will populate the database with relevant beach/sruf data
	3) In the root directory, input "gulp" into your terminal. The gulp file will run spec and initialize the front end application
	4) Navitage to localhost:1337/

	To test the backend, navitage to ./backend/spec and run 'mocha' in your terminal

## Requirements

	- npm
	- bower
	- gulp
	- node
	- express.js
	- mocha
	- chai

## Roadmap

	View the project roadmap [here](https://github.com/Insuperable-Arete/cerberus/issues)


## Contributing

	See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
