'use client';

import { CollapseProps, ColorPicker, Input} from "antd";

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import isIComponent from "@/utils/isIComponent";

const getItems: GetItemsType = (
  component, 
  onPropUpdateHandler, 
  onStyleUpdateHandler,
) => {
  if (!isIComponent(component)) {
    return;
  }

  const props = <>
    <PropItem label="ID">
      <span>{component.id}</span>
    </PropItem>
  </>

  const styles = <>
    <PropItem label="宽度">
      <Input
        value={component.style.width} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('width', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="高度">
      <Input
        value={component.style.height} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('height', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="左">
      <Input
        value={component.style.left} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('left', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="顶">
      <Input
        value={component.style.top} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('top', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="字体大小">
      <Input 
        value={component.style.fontSize ?? 14} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('fontSize', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="字体颜色">
      <ColorPicker 
        showText
        value={component.style.color ?? '#000000'}
        onChange={(color) => {
          onStyleUpdateHandler('color', color.toHexString());
        }}
      ></ColorPicker>
    </PropItem>
  </>

  const items: CollapseProps['items'] = [
    {
      label: '属性',
      key: '1',
      children: (
        <>{props}</>
      )
    }, {
      label: '样式',
      key: '2',
      children: (
        <>{styles}</>
      )
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
