import { CollapseProps, ColorPicker, Input } from "antd";

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import AddGlobalState from "./addGlobalState";
 
const getItems: GetItemsType = (
  canvas, 
  onPropUpdateHandler, 
  onStyleUpdateHandler,
) => {
  const props = (
    <PropItem label="页面名称">
      <Input
        value={canvas.title} 
        onChange={(e) => onPropUpdateHandler('title', e.target.value)} 
      />
    </PropItem>
  )
  const styles = <>
    <PropItem label="宽度">
      <Input
        value={canvas.style.width} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('width', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="高度">
      <Input
        value={canvas.style.height} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('height', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="背景颜色">
      <ColorPicker 
        value={canvas.style.backgroundColor}
        showText
        onChange={(color) => {
          onStyleUpdateHandler('backgroundColor', color.toHexString());
        }}
      ></ColorPicker>
    </PropItem>
  </>

  const items: CollapseProps['items'] = [
    {
      label: '属性',
      key: '1',
      children: (
        <>
          {props}
        </>
      )
    }, {
      label: '样式',
      key: '2',
      children: (
        <>
          {styles}
        </>
      )
    }, {
      label: "页面变量",
      key: '3',
      children: (
        <AddGlobalState />
      )
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
