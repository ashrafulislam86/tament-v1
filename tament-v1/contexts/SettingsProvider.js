import * as React from 'react';
import { useToggler } from '../utils/CustomHooks';

const SettingsContext = React.createContext();

export const useSettings = () => React.useContext(SettingsContext);

export default function SettingsProvider({ children }) {
  const [ darkTheme, toggleTheme ] = useToggler(false,React.useState)
  const [ showPersonalizedAds, togglePersonalized ] = useToggler(false,React.useState)
  
  const value = {
    showPersonalizedAds,
    togglePersonalized,
    toggleTheme
  };
  
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
