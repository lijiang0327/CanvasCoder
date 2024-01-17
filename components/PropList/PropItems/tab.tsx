import {CollapseProps, Input} from "antd";
import classNames from 'classnames';
import {cloneDeep} from 'lodash';

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import type {IComponent} from "@/store/editorStore.d";
import {updateComponent} from '@/store/editorStore';
 
const getItems: GetItemsType = (
  component, 
  onPropUpdateHandler,
  onStyleUpdateHandler,
) => {
  const tabComponent = component as IComponent;
  const tabItems = tabComponent.items ?? [];

  const props = <>
    <PropItem label="ID">
      <span>{component.id}</span>
    </PropItem>
    <PropItem label="标签">
      <>
        {tabItems.map((tabItem, index) => {
          return (
            <Input 
              className={classNames(index < tabItems.length -1 && "mb-2")} 
              value={tabItem.label} key={tabItem.id}
              onChange={(e) => {
                const items = cloneDeep(tabItems);
                items[index].label = e.target.value;
                updateComponent({
                  id: component.id,
                  items: [...items]
                })
              }}
            />
          )
        })}
      </>
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
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
