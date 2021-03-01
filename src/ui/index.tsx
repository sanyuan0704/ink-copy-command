import React, { FC, useState } from 'react';
import { Text, Box, Newline, Spacer } from 'ink';
import { FullScreen } from './full-screen';
import { Tab, Tabs } from 'ink-tab';
import Markdown from 'ink-markdown';
import dedent from 'dedent';
import { FileCopyConsumer } from '../consumers/FileCopyConsumer';
import { State } from './state';
import { Log } from './log';
import { Context } from './context';

interface AppProps {
	fileConsumer: FileCopyConsumer
}

const ACTIVE_TAB_NAME = {
	STATE: "执行状态",
	LOG: "执行日志"
}

const App: FC<AppProps> = ({ fileConsumer }) => {
	const [activeTab, setActiveTab] = useState<string>(ACTIVE_TAB_NAME.STATE);
	const handleTabChange = (name) => {
		setActiveTab(name)
	}
	const WELCOME_TEXT = dedent`
		欢迎来到 \`ink-copy\` 控制台！功能概览如下(按 **Tab** 切换):
	`

	return <>
		<Context.Provider value={{ fileConsumer }}>
			<FullScreen>
				<Box>
					<Markdown>{WELCOME_TEXT}</Markdown>
				</Box>
				<Tabs onChange={handleTabChange}>
					<Tab name={ACTIVE_TAB_NAME.STATE}>{ACTIVE_TAB_NAME.STATE}</Tab>
					<Tab name={ACTIVE_TAB_NAME.LOG}>{ACTIVE_TAB_NAME.LOG}</Tab>
				</Tabs>
				<Box>
					<Box display={ activeTab === ACTIVE_TAB_NAME.STATE ? 'flex': 'none'}>
						<State />
					</Box>
					<Box display={ activeTab === ACTIVE_TAB_NAME.LOG ? 'flex': 'none'}>
						<Log />
					</Box>
				</Box>
			</FullScreen>
		</Context.Provider>
	</>
};

export default App;
