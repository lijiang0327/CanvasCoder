import { ICanvas, IComponent, IComponentType } from "@/store/editorStore.d"
import {updateComponent, updateCanvasProp} from '@/store/editorStore';
import button from './button';
import title from './title';
import input from './input';
import canvasProp from './canvas';
import tab from './tab';
import {Prop} from './prop';
import isIComponent from "@/utils/isIComponent";

const propMap: {
  [P in IComponentType]: Prop
} = {
  button,
  input,
  text: title,
  title,
  tab,
}

export const getCanvasPropItems = (canvas: ICanvas) => {
  const onCanvasPropUpdateHandler = (key: string, value: unknown) => {
    updateCanvasProp({
      [key]: value
    })
  }

  const onCanvasStyleUpdateHandler = (key: string, value: unknown) => {
    updateCanvasProp({
      style: {
        ...canvas.style,
        [key]: value
      }
    })
  }

  return canvasProp.getItems(canvas, onCanvasPropUpdateHandler, onCanvasStyleUpdateHandler);
}

export const getComponentPropItems = (component: IComponent | ICanvas | null) => {

  if (!component || !isIComponent(component)) {
    return []
  }

  const onPropUpdateHandler = (key: string, value: unknown) => {
    updateComponent({
      id: component.id,
      [key]: value
    })
  }

  const onStyleUpdateHandler = (key: string, value: unknown) => {
    updateComponent({
      id: component.id,
      style: {
        ...component.style,
        [key]: value
      }
    })
  }

  return propMap[component.type].getItems(component, onPropUpdateHandler, onStyleUpdateHandler);
}
