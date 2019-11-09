#!/usr/bin/env node

const yargs = require('yargs')
const path = require('path')
const { run } = require('./config-xml-version')

const packageJson = require(path.resolve('./package.json')) // eslint-disable-line import/no-dynamic-require

const args = yargs
  .command('config-xml-version', 'Applies the package.json version to config.xml file.')
  .option('sourceFile', {
    description: 'the source config.xml file',
    alias: 's',
    type: 'string',
    default: 'config.xml'
  })
  .option('destFile', {
    description: 'the destiny config.xml file',
    alias: 'd',
    type: 'string',
    default: 'config.xml'
  })
  .option('configXmlVersion', {
    description: 'the version to be applied',
    alias: 'v',
    type: 'string',
    default: packageJson.version
  })
  .option('indentation', {
    description: 'the config.xml file indentation to be used',
    alias: 'i',
    type: 'string',
    default: '    '
  })
  .help()
  .alias('help', 'h')
  .argv

const params = {
  sourceFile: path.resolve(args.sourceFile),
  destFile: path.resolve(args.destFile),
  version: args.configXmlVersion,
  indentation: args.indentation
}

run(params)
