"use strict";
global.PACKAGE_NAME = 'Fencer';

const express       = require('express'),
    bodyParser      = require('body-parser'),
    API             = require('rapi-js-package'),
    fs              = require('fs'),
    lib             = require('./lib'),
    _               = lib.callback;

const PORT          = process.env.PORT || 8080;
const app           = express();

let mfile = fs.readFileSync('./metadata.json', 'utf-8'),
    cfile = fs.readFileSync('./control.json',  'utf-8');

let metadata = JSON.parse(mfile),
    control  = JSON.parse(cfile);

app.use(bodyParser.json(({limit: '50mb'})));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.all(`/api/${PACKAGE_NAME}`, (req, res) => { res.send(metadata); });

for(let func in control) {
    let {
        method, 
        args,
        values,
        url
    } = control[func];

    if (func == 'getGeofences' || func == 'getSingleGeofence') {
        app.post(`/api/${PACKAGE_NAME}/${func}`, _(function*(req, res) {
            let response;
            let opts = {};
            let r = {
                callback: "",
                contextWrites: {}
            };

            req.body.args = lib.clearArgs(req.body.args);

            let params = {
                'Authorization': req.body.args['apiKey'],
                'Access-Key': req.body.args['accessKey']
            };

            let headers = lib.clearArgs(params);

            try {
                for (let arg in args) {
                    let argarr = arg.split('|');
                    opts[args[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
                }

                response = yield new API(url, {headers}).request({
                    method,
                    query: opts,
                    parseUri: true
                });

                r.callback = 'success';
                r.contextWrites['to'] = response;
            } catch (e) {
                r.callback = 'error';
                r.contextWrites['to'] = e.status_code ? e : {status_code: "API_ERROR", status_msg: e.message ? e.message : e};
            }

            res.status(200).send(r);
        }))
    }
    else {
        app.post(`/api/${PACKAGE_NAME}/${func}`, _(function*(req, res) {
            let response;
            let opts = {};
            let r = {
                callback: "",
                contextWrites: {}
            };

            req.body.args = lib.clearArgs(req.body.args);

            let params = {
                'Authorization': req.body.args['apiKey'],
                'Access-Key': req.body.args['accessKey']
            };

            if (req.body.args.hasOwnProperty('coordinates') && req.body.args['coordinates']) {
                let coordinates = req.body.args.coordinates.replace(/\s+/g, '').split(',');
                params['Lat-Pos'] = coordinates[0];
                params['Lng-Pos'] = coordinates[1];
            }
            else if (req.body.args.hasOwnProperty('latitude') && req.body.args['latitude'] && req.body.args.hasOwnProperty('latitude') && req.body.args['latitude']) {
                params['Lat-Pos'] = req.body.args['latitude'];
                params['Lng-Pos'] = req.body.args['longitude'];
            }
            else {
                r.callback = 'error';
                r.contextWrites['to'] = {
                    status_code: 'REQUIRED_FIELDS',
                    status_msg: 'Please, check and fill in required fields: coordinates OR (latitude AND longitude)'
                };
                res.status(200).send(r);
            }

            let headers = lib.clearArgs(params);

            try {
                for (let arg in args) {
                    let argarr = arg.split('|');
                    opts[args[arg] + '|' + argarr[0]] = req.body.args[argarr[1]];
                }

                response = yield new API(url, {headers}).request({
                    method,
                    query: opts,
                    parseUri: true
                });

                r.callback = 'success';
                r.contextWrites['to'] = response;
            } catch (e) {
                r.callback = 'error';
                r.contextWrites['to'] = e.status_code ? e : {status_code: "API_ERROR", status_msg: e.message ? e.message : e};
            }

            res.status(200).send(r);
        }))
    }
}

app.listen(PORT);
module.exports = app;
