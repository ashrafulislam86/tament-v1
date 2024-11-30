import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX_KEY = 'offline@';

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log('error' + e);
  }
};

const getSavedValue = (key, initialiValue) => {
  var value;
  getData(key).then((val) => {
    value = val;
    console.log('iiiii ' + JSON.stringify(value));
  });
  console.log('ifsd ' + JSON.stringify(value));
  return value ?? initialiValue;
};

export function useAsyncStorageReducer(name, reducerFunc, initialiValue) {
  var key = PREFIX_KEY + name;

  const [data, dispatch] = React.useReducer(
    reducerFunc,
    getSavedValue(key, initialiValue),
    (init) => {
      console.log(JSON.stringify(init));
      return getSavedValue(key,initialiValue);
    }
  );

  React.useLayoutEffect(() => {
    const storeData = async (value, k) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(k, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(data, key);
  }, [key, data]);

  return [data, dispatch];
}

export function useAsyncStorage(name, initialiValue) {
  const key = PREFIX_KEY + name;
  const v = getSavedValue() ?? initialiValue;
  const [data, dispatch] = React.useReducer(v);

  React.useEffect(() => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(data);
  }, [key, data]);

  return [data, dispatch];
}

//nmnlkk

export function useToggler(boolV, state = useAsyncStorage) {
  const [value, setValue] =React.useState(boolV);
  const toggler = (v = null) => {
    if (v) return setValue(v);
    setValue((prev) => !prev);
  };
  return [value, toggler];
}
