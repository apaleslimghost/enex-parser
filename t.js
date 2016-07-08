var parse = require('./');
var fs = require('fs');

console.log(
	parse(
		fs.readFileSync('My Notes.enex', 'utf8')
	)
);
