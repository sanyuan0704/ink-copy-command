import { FileCopyConsumer } from "../consumers/FileCopyConsumer";
import React from 'react';

interface AppContext {
  fileConsumer: FileCopyConsumer;
}

export const Context = React.createContext<AppContext | null>(null);