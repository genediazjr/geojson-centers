'use strict';

const geojson = require('./geo.json').features;
const turf = require('@turf/turf');
const fs = require('fs');

const exceptions = {
    'Kalookan City': [
        121.0433162,
        14.7471291
    ]
};

const features = [];
for (let i = 0; i < geojson.length; ++i) {
    const feature = geojson[i];
    const center = turf.centerOfMass(feature);

    if (exceptions[feature.properties.NAME_2]) {
        center.geometry.coordinates = exceptions[feature.properties.NAME_2];
    }

    center.properties = feature.properties;
    features.push(center);
}

fs.writeFileSync('centers.json', Buffer.from(JSON.stringify({
    type: 'FeatureCollection',
    features: features
}), 'utf8'));
