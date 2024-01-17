import {create} from 'zustand';
import {cloneDeep, mergeWith, merge} from 'lodash';

import type {ICanvas, IComponent} from './editorStore.d';
import getDefaultCanvasData from '@/utils/getDefaultCanvasData';

type EditorStoreState = {
  canvas: ICanvas
  selectedComponent: IComponent | null | ICanvas
  allPages: string[]
  currentPage: string
}

const useEditorStore = create<EditorStoreState>()(() => ({
  canvas: getDefaultCanvasData(),
  selectedComponent: null,
  allPages: [],
  currentPage: '',
}));

export const initDefaultCanvasData = () => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      canvas: getDefaultCanvasData()
    }
  })
}

export const addComponent = (component: IComponent) => {
  useEditorStore.setState((state) => {
    const children = [...state.canvas.children, component.id];
    const childrenMap = {...state.canvas.childrenMap, [component.id]: component};

    return {
      ...state,
      canvas: {
        ...state.canvas,
        children,
        childrenMap,
      }
    }
  });
}

export const addComponentToChildrenMap = (component: IComponent) => {
  useEditorStore.setState((state) => {
    const childrenMap = {...state.canvas.childrenMap, [component.id]: component};

    return {
      ...state,
      canvas: {
        ...state.canvas,
        childrenMap,
      }
    }
  })
}

export const removeComponent = (component: IComponent) => {
  useEditorStore.setState((state) => {
    const children = state.canvas.children.filter((id) => id !== component.id);
    const childrenMap = cloneDeep(state.canvas.childrenMap);
    delete childrenMap[component.id];

    return {
      ...state,
      canvas: {
        ...state.canvas,
        children,
        childrenMap,
      }
    }
  })
}

const mergeWithFunc = (targetValue: unknown, sourceValue: unknown) => {
  if (Array.isArray(sourceValue)) {
    return sourceValue;
  }
}

export const updateComponent = (component: Partial<IComponent> & {id: number | string}) => {
  useEditorStore.setState((state) => {
    const childrenMap = cloneDeep(state.canvas.childrenMap);
    const children = cloneDeep(state.canvas.children);

    mergeWith(childrenMap[component.id], component, mergeWithFunc);

    return {
      ...state,
      canvas: {
        ...state.canvas,
        childrenMap,
        children,
      }
    }
  })
}

export const updateCanvasTranslation = (x: number, y: number) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      canvas: {
        ...state.canvas,
        translateX: x,
        translateY: y,
      }
    }
  })
}

export const setSelectedComponent = (component: IComponent | ICanvas) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      selectedComponent: component
    }
  })
}

export const clearSelectedComponent = () => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      selectedComponent: null
    }
  })
}

export const updateCanvasProp = (canvas: Partial<Omit<ICanvas, 'children'>>) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      canvas: {
        ...Object.assign({}, state.canvas, canvas)
      }
    }
  })
}

export const initCanvasData = (canvas: ICanvas) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      canvas: cloneDeep(canvas),
    }
  })
}

export const setCurrentPage = (page: string) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      currentPage: page
    }
  })
}

export const setPages = (pages: string[]) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      allPages: pages
    }
  })
}

export const addPage = (page: string) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      allPages: [...state.allPages, page],
      currentPage: page
    }
  })
}

export const removePage = (page: string) => {
  useEditorStore.setState((state) => {
    return {
      ...state,
      allPages: state.allPages.filter((pg) => pg !== page),
      currentPage: state.currentPage === page ? '' : state.currentPage
    }
  })
}

export default useEditorStore;
