import {create} from 'zustand';
import {omit} from 'lodash';

import { type StateType } from './editorStore.d';

type GlobalState = {
  globalState: Record<string, unknown>
  globalStateKeys: string[]
  globalStateType: Record<string, 'boolean' | 'string' | 'number'>
}

const useGlobalStore = create<GlobalState>()(() => ({
  globalState: {},
  globalStateKeys: [],
  globalStateType: {}
}))

export const addState = (key: string, value: unknown, type: StateType) => {
  useGlobalStore.setState((state) => {
    const {globalState, globalStateKeys, globalStateType} = state;

    if (globalStateKeys.includes(key)) {
      return state;
    }

    return {
      globalState: {
        ...globalState,
        [key]: value,
      },
      globalStateKeys: [...globalStateKeys, key],
      globalStateType: {
        ...globalStateType,
        [key]: type
      }
    }
  })
}

export const updateState = (key: string, value: unknown, type: StateType) => {
  useGlobalStore.setState((state) => {
    const {globalState, globalStateType} = state;

    return {
      ...state,
      globalState: {
        ...globalState,
        [key]: value
      },
      globalStateType: {
        ...globalStateType,
        [key]: type
      }
    }
  })
}

export const removeState = (key: string) => {
  useGlobalStore.setState((state) => {
    const {globalState, globalStateKeys, globalStateType} = state;

    return {
      globalState: omit(globalState, key),
      globalStateType: omit(globalStateType, key),
      globalStateKeys: globalStateKeys.filter((k) => key !== k)
    }
  })
}

export const clearState = () => {
  useGlobalStore.setState(() => {
    return {
      globalState: {},
      globalStateKeys: [],
      globalStateType: {}
    }
  })
}

export const initState = (globalState: Record<string, unknown>) => {
  useGlobalStore.setState(() => {

    const globalStateType: Record<string, StateType> = {};

    Object.entries(globalState).forEach(([key, value]) => {
      globalStateType[key] = (typeof value) as StateType;
    })

    return {
      globalState,
      globalStateKeys: Object.keys(globalState),
      globalStateType,
    }
  })
}

export default useGlobalStore;
