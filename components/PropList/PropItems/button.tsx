'use client';

import { CollapseProps, ColorPicker, Input, Select, Button} from "antd";
import {useState, FC} from 'react';

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import { CustomEvent, IComponent } from "@/store/editorStore.d";
import { DeleteOutlined } from "@ant-design/icons";
import isIComponent from "@/utils/isIComponent";

type ButtonEventProps = {
  onPropUpdateHandler: (key: string, value: unknown) => void,
  component: IComponent,
}

const ButtonEvent: FC<ButtonEventProps> = ({component, onPropUpdateHandler}) => {
  const [clickEventType, setClickEventType] = useState('');
  const [eventValue, setEventValue] = useState('');

  const onAddEventClickHandler = () => {
    onPropUpdateHandler('onClick', [...(component.onClick ?? []), {
      funcName: clickEventType,
      params: eventValue,
    }]);
    setClickEventType('');
    setEventValue('');
  }

  const onDeleteEventClickHandler = (index: number) => {
    const funcs = [...(component.onClick ?? [])];

    funcs.splice(index, 1);
    onPropUpdateHandler('onClick', funcs);
  }

  return <PropItem label="点击时">
    <div className="w-full mt-2">
      {!!component.onClick?.length && component.onClick.map((event: CustomEvent, index: number) => {
        return <div key={event.funcName + event.params + index} className="py-2 mb-2 flex items-center justify-between">
          <div>
            <span>{event.funcName}: </span>
            <span>{String(event.params)} </span>
          </div>
          <Button onClick={() => onDeleteEventClickHandler(index)} icon={<DeleteOutlined />} danger type="text" size="small" />
        </div>
      })}
      <div className="flex gap-2 items-center">
        <span className="w-10 text-right">事件: </span>
        <Select
          className="w-full flex-1"
          onChange={(value) => setClickEventType(value)}
          value={clickEventType}
          options={[
            {
              label: '无',
              value: '',
            },
            {
              label: '弹出提示框',
              value: 'alert',
            },
            {
              label: '跳转页面',
              value: 'navigateTo'
            }
          ]}
        ></Select>
      </div>
      {!!clickEventType && <>
        <div className="flex gap-2 items-center mt-2">
          <span className="w-10 text-right">值: </span>
          <Input value={eventValue} onChange={(e) => setEventValue(e.target.value)} className="w-full flex-1"/>
        </div>
        <div className="flex justify-center mt-2">
        <Button type="primary" onClick={onAddEventClickHandler}>添加</Button>
      </div>
      </>}
    </div>
  </PropItem>
}
 
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
    <PropItem label="文本">
      <Input
        value={component.text} 
        onChange={(e) => onPropUpdateHandler('text', e.target.value)} 
      />
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

  const events = (
    <ButtonEvent component={component} onPropUpdateHandler={onPropUpdateHandler} />
  )

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
    }, {
      label: '事件',
      key: '3',
      children: (
        <>{events}</>
      )
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
