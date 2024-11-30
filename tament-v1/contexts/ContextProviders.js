import * as React from 'react';
import SettingsProvider from './SettingsProvider';
import TaskProvider from './TaskProvider';

export default function ContextProviders({ children }) {
  return (
    <SettingsProvider>
      <TaskProvider>{children}</TaskProvider>
    </SettingsProvider>
  );
}
