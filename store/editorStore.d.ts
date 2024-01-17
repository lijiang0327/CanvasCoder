import { type CSSProperties } from "react";

export type Style = CSSProperties;

export interface ICanvas {
  title: string
  style: Style
  children: (string | number)[]
  childrenMap: Record<string | number, IComponent>
  translateX: number
  translateY: number
  zoom: number
  locked?: boolean
}

export type IComponentType = 'text' | 'input' | 'button' | 'title' | 'tab';

export type CustomEvent = {
  funcName: string
  params: unknown
}

export type ITabItem = {
  label: string
  id: string
  children?: (string | number)[]
}

export interface IComponent {
  type: IComponentType
  style: Style
  id: number | string
  value?: string
  onClick?: CustomEvent[]
  onDblClick?: CustomEvent[]
  variable?: string
  text?: string
  editable?: boolean
  draggable?: boolean
  items?: ITabItem[]
  children?: string[]
  parentId?: number | string
  locked?: boolean
}

export interface IGroup {
  children: string[]
  id: number
}

export type StateType = 'boolean' | 'string' | 'number';
