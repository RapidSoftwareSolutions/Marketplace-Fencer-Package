# Fencer Package
Provide new context to location aware applications and IoT devices.
* Domain: 
* Credentials: apiKey, accessKey

## How to get credentials: 
0. First, you'll need an account on Fencer. Just [sign up](https://fencer.io/register). There's a free tier you can get started with immediately. It may be all you'll need.
1. Once you've signed up and activated your account, you'll find your Fencer API key in your [account settings](https://fencer.io/account/settings). You'll need this API key to use Fencer in your own web/mobile applications, or just to test against.
2. Every geofence you create has an Access key. You can find the key for a geofence in your account. You need an Access key to use any geofence over the API.

## Fencer.getGeofences
Obtain information about public and private geofences associated with an API key.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.

## Fencer.getSingleGeofence
Obtain information about a geofence. You can query a public or private geofence of your own, or any public geofence.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.

## Fencer.navigationIn
Check a position and obtain bearing and distance of shortest route into a geofence. You can query a public or private geofence of your own, or any public geofence.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.
| latitude  | String     | Latitude coordinate
| longitude | String     | Longitude coordinate

## Fencer.navigationOrigin
Check a position and obtain bearing and distance (km) of shortest route to origin/center of geofence. You can query a public or private geofence of your own, or any public geofence.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.
| latitude  | String     | Latitude coordinate
| longitude | String     | Longitude coordinate

## Fencer.navigationOut
Check a position and obtain bearing and distance (km) of shortest route out of a geofence. You can query a public or private geofence of your own, or any public geofence.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.
| latitude  | String     | Latitude coordinate
| longitude | String     | Longitude coordinate

## Fencer.positionInside
Check a position to ascertain if inside or outside of a geofence. You can query a public or private geofence of your own, or any public geofence.Returns true if coordinates sit inside the geofence, false if not.

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.
| latitude  | String     | Latitude coordinate
| longitude | String     | Longitude coordinate

## Fencer.positionStatus
Check a position against a geofence. Returns returns informationa about whether inside or outside a geofence and routes to enter or exit and origin. 

| Field     | Type       | Description
|-----------|------------|----------
| apiKey    | credentials| Your Fencer API key.
| accessKey | String     | Fencer Geofences Access Key.
| latitude  | String     | Latitude coordinate
| longitude | String     | Longitude coordinate

