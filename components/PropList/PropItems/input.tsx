import {CollapseProps, ColorPicker, Input, Select} from "antd";
import {FC} from "react";

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import {IComponent} from "@/store/editorStore.d";
import usePageStateStore from "@/store/pageStateStore";

type VariablesProps = {
  propUpdateHandler: (key: string, value: unknown) => void,
  componentData: IComponent
}

const Variables: FC<VariablesProps> = ({propUpdateHandler, componentData}) => {
  const {pageStateKeys} = usePageStateStore((state) => ({pageStateKeys: state.pageStateKeys}));

  const onVariableChangeHandler = (value: string) => {
    propUpdateHandler('variable', value);
  }

  return <PropItem
    label="绑定变量"
    tips="绑定变量后‘文本’属性将失效"
  >
    <Select
      key={componentData.id}
      onChange={onVariableChangeHandler}
      value={componentData.variable}
      className="w-full"
      options={[
        {
          label: '无',
          value: '',
        },
        ...pageStateKeys.map((key) => ({
          label: key,
          value: key
        }))
      ]}
    ></Select>
  </PropItem>
}
 
const getItems: GetItemsType = (
  component, 
  onPropUpdateHandler, 
  onStyleUpdateHandler,
) => {
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
      label: '变量',
      key: '3',
      children: (
        <Variables componentData={component} propUpdateHandler={onPropUpdateHandler} />
      )
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
