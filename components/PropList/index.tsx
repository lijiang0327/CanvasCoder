'use client'
import {FC} from 'react';
import {Collapse} from 'antd';

import useEditorStore from '@/store/editorStore';
import isIComponent from '@/utils/isIComponent';
import { getCanvasPropItems, getComponentPropItems } from './PropItems';

type PropListProps = {}

const PropList: FC<PropListProps> = () => {
  const {selectedComponent, canvas} = useEditorStore((state) => ({selectedComponent: state.selectedComponent, canvas: state.canvas}));

  if (!selectedComponent) {
    return null;
  }

  const items = isIComponent(selectedComponent) 
    ? getComponentPropItems(canvas.childrenMap[selectedComponent.id]) 
    : getCanvasPropItems(canvas); 

  return (
    <Collapse items={items} defaultActiveKey={items?.map((item) => item.key) as string[]} />
  )
}

export default PropList;
