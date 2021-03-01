import React, { FC, useContext, useState } from "react";
import { Context } from './context';
import { Box, Text, Newline } from 'ink';
import Spinner from 'ink-spinner';
import { EventData } from '../consumers/FileCopyConsumer';

export const State: FC<{}> = () => {
  const context = useContext(Context);
  const [finish, setFinish] = useState(false);
  context?.fileConsumer.onEvent((data: EventData) => {
    if (data.kind === 'finish') {
      setTimeout(() => {
        setFinish(true)
      }, 2000)
    }
  })

  return (
    <Box flexDirection="row">
      {!finish && (
        <>
          <Box marginRight={1}>
            <Spinner />
          </Box>
          <Text color="green">拷贝中...</Text>
        </>
      )}
      {finish && (
        <Box flexDirection="column">
          <Text color="green">拷贝完成!</Text><Newline />
          <Text color="cyan">按 Tab 即可查看日志</Text>
        </Box>
      )}
    </Box>
  )
}