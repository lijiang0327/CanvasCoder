import {create} from 'zustand';
import {omit} from 'lodash';

import { type StateType } from './editorStore.d';

type PageState = {
  pageState: Record<string, unknown>
  pageStateKeys: string[]
  pageStateType: Record<string, 'boolean' | 'string' | 'number'>
}

const usePageStateStore = create<PageState>()(() => ({
  pageState: {},
  pageStateKeys: [],
  pageStateType: {}
}))

export const addState = (key: string, value: unknown, type: StateType) => {
  usePageStateStore.setState((state) => {
    const {pageState, pageStateKeys, pageStateType} = state;

    if (pageStateKeys.includes(key)) {
      return state;
    }

    return {
      pageState: {
        ...pageState,
        [key]: value,
      },
      pageStateKeys: [...pageStateKeys, key],
      pageStateType: {
        ...pageStateType,
        [key]: type
      }
    }
  })
}

export const updateState = (key: string, value: unknown, type: StateType) => {
  usePageStateStore.setState((state) => {
    const {pageState, pageStateType} = state;

    return {
      ...state,
      pageState: {
        ...pageState,
        [key]: value
      },
      pageStateType: {
        ...pageStateType,
        [key]: type
      }
    }
  })
}

export const removeState = (key: string) => {
  usePageStateStore.setState((state) => {
    const {pageState, pageStateKeys, pageStateType} = state;

    return {
      pageState: omit(pageState, key),
      pageStateType: omit(pageStateType, key),
      pageStateKeys: pageStateKeys.filter((k) => key !== k)
    }
  })
}

export const clearState = () => {
  usePageStateStore.setState(() => {
    return {
      pageState: {},
      pageStateKeys: [],
      pageStateType: {}
    }
  })
}

export const initState = (pageState: Record<string, unknown>) => {
  usePageStateStore.setState(() => {

    const pageStateType: Record<string, StateType> = {};

    Object.entries(pageState).forEach(([key, value]) => {
      pageStateType[key] = (typeof value) as StateType;
    })

    return {
      pageState,
      pageStateKeys: Object.keys(pageState),
      pageStateType,
    }
  })
}

export default usePageStateStore;
