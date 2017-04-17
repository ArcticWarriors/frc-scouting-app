# frc-scouting-app
Web Application for FRC Scouting

## Setup

* Install [NodeJS and npm](https://nodejs.org/en/download/)
* Open a command prompt/terminal, cd into frc-scouting-app, and run `npm install` to install the dependancies
* Once started, the server will be available on either localhost or your external IP on port 3000 - use the HOST and PORT
environment variables to bind to a different host or port

### For development
* To use the loobback CLI to help you create models when developing the server, run `npm install -g loopback-cli`
* To run the development server, run `npm start`
* If you want to do a one-off generation of client files, run `npm build:dev`

### For Production
* Install [mongodb](https://docs.mongodb.com/manual/installation/) (other databases/data sources can be used by modifying
server/datasources.production.js and installing the appropriate loopback connector, per the documentation:
https://loopback.io/doc/en/lb3/Connecting-models-to-data-sources.html)
* Generate the client files by running `npm run build:prod`
* Run the server in production mode by running `npm start` with the following environment variables set:
    * NODE_ENV: "production"
    * DB_HOST: Database hostname to connect to
    * DB_PORT: Database port to connect to (default 27017)
    * DB_USER: Database username to connect with
    * DB_PASSWORD: Database password to connect with
    * DB_NAME: Database name (default frc-scouting)