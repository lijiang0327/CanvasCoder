import type { IComponent, ICanvas } from "@/store/editorStore.d"
import type { CollapseProps } from "antd";

export type GetItemsType = (
  component: IComponent, 
  propUpdateHandler: (key: string, value: unknown) => void,
  styleUpdateHandler: (key: string, value: unknown) => void,
) => CollapseProps['items'];

export type Prop = {
  getItems: GetItemsType
}
