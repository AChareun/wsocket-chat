const merge = require('merge');
const tsPreset = require('ts-jest/jest-preset');
const mongoPreset = require('@shelf/jest-mongodb/jest-preset');

module.exports = merge.recursive(tsPreset, mongoPreset, {
    preset: 'tsAndMongo',
    transform: tsPreset.transform,
});
