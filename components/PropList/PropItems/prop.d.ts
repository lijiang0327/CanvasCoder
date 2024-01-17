import { ICanvas } from "@/store/editorStore";
import { IComponent } from "@/store/editorStore"
import { CollapseProps } from "antd";

export type GetItemsType = (
  component: IComponent, 
  propUpdateHandler: (key: string, value: unknown) => void,
  styleUpdateHandler: (key: string, value: unknown) => void,
) => CollapseProps['items'];

export type Prop = {
  getItems: GetItemsType
}
