import {create} from 'zustand';

import { ICanvas } from './editorStore.d';

type PageStoreState = {
  canvas: ICanvas | null,
  projects: string[],
  pages: string[]
}

const usePageStore = create<PageStoreState>()(() => ({
  canvas: null,
  projects: [],
  pages: []
}))

export const setCanvasState = (canvas: ICanvas | null) => {
  usePageStore.setState((state) => {
    return {
      ...state,
      canvas
    }
  })
}

export const setProjects = (projects: string[]) => {
  usePageStore.setState((state) => {
    return {
      ...state,
      projects,
    }
  })
}

export const setPages = (pages: string[]) => {
  usePageStore.setState((state) => {
    return {
      ...state,
      pages
    }
  })
}

export default usePageStore;
