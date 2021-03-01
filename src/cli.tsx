#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './ui';
import { FileOperator } from './file-operator/index';

const cli = meow(`
	Usage
	  $ ink-copy

	Options
		--name Your name

	Examples
	  $ ink-copy --name=Jane
	  Hello, Jane
`, {
	flags: {
		name: {
			type: 'string',
			default: 'sanyuan'
		}
	}
});

const fileOperator = new FileOperator();

render(<App fileConsumer={fileOperator.fileConsumer}/>);
fileOperator.copyFiles();
