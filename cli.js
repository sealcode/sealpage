#!/usr/bin/env node

const chalk = require('chalk');
const sealpage = require('./index');

const init = () => {
	console.log(chalk.green('Sealpage init command'));
};

const run = async () => {
	switch (process.argv[2]) {
	case undefined:
		console.log(chalk.red('Please type build or watch'));
		break;
	case 'build':
		console.log(
			chalk.black.bgWhiteBright.bold(' Build %s '),
			process.argv[3]
		);
		// sealpage.build()

		break;
	case 'watch':
		console.log(
			chalk.black.bgYellowBright.bold(' Watch %s '),
			process.argv[3]
		);
		break;
	default:
		break;
	}

	init();
};

run();
