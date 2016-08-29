#!/usr/bin/env node

const parser = require('./');
const path = require('path');
const fs = require('fs');

process.stdout.write(
	JSON.stringify(
		parser(
			fs.readFileSync(path.resolve(process.argv[2]), 'utf8')
		)
	)
);
