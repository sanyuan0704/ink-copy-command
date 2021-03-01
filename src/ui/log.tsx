import React, { FC, useContext, useState } from "react";
import { Context } from './context';
import { Box, Text, Newline } from 'ink';
import { EventData } from '../consumers/FileCopyConsumer';

export const Log: FC<{}> = () => {
  const context = useContext(Context);
  const [finish, setFinish] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  context?.fileConsumer.onEvent((data: EventData) => {
    if (data.kind === 'finish') {
      setFinish(true)
      setLogs(data.payload);
    }
  })

  return (
    <Box flexDirection="column">
      {!finish && <Text color="gray">暂无日志</Text>}
      {finish && logs.map(item => (
        <>
          <Text color="green">{item}</Text>
          <Newline />
        </>
        ))}
    </Box>
  )
}