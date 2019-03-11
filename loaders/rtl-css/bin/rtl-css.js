#!/usr/bin/env node

/*!
 * Copyright (C) 2015 by Yuriy Nasretdinov
 *
 * See license text in LICENSE file
 */

const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
    prog: 'proto2json',
    description: require('../package.json').description,
    version: require('../package.json').version,
    addHelp: true,
});
parser.addArgument(['-i', '--input'], {
    action: 'store',
    defaultValue: '/dev/stdin',
    type: 'string',
    help: 'Input file. Default: read from /dev/stdin.',
});
parser.addArgument(['-o', '--output'], {
    action: 'store',
    defaultValue: '/dev/stdout',
    help: 'Output file. Default: write to /dev/stdout.',
});
parser.addArgument(['-d', '--direction'], {
    action: 'store',
    defaultValue: 'ltr',
    help: 'Language direction: ltr or rtl. Default: ltr.',
});
parser.addArgument(['-c', '--config'], {
    action: 'store',
    defaultValue: false,
    help: 'Config file. Default: config that is used in Badoo.',
});
const args = parser.parseArgs();

const fs = require('fs');
const path = require('path');

// Get config
const default_config_name = path.join(
    path.dirname(fs.realpathSync(__filename)),
    '..',
    'config.json'
);
const config_name = args.config ? args.config : default_config_name;
let config = fs.readFileSync(config_name);
if (!config) {
    console.log(`Cannot read config from ${config_name}`);
    process.exit(1);
}

config = JSON.parse(config.toString());

// Read input
let input = fs.readFileSync(args.input);
if (!input) {
    console.log(`Cannot read input from ${args.input}`);
    process.exit(1);
}
input = input.toString();

// Process
const rtlCss = require('../');
const output = rtlCss.processCss(rtlCss.processConfig(config), args.direction, input);

// Write output
const fd = fs.openSync(args.output, 'w');
if (!fd) {
    console.log(`Cannot open output file ${args.output}`);
    process.exit(1);
}

const result = fs.writeSync(fd, output);
if (!result) {
    console.log(`Cannot write output to ${args.output}`);
    process.exit(1);
}
