import {FC, type MouseEvent, type KeyboardEvent, type DragEvent, useState, useRef} from 'react';
import {Tabs, type TabsProps} from 'antd';

import {IComponent} from '@/store/editorStore.d';
import Cmp from './Cmp';
import {getDefaultTabItem} from '@/utils/getDefaultTabComponent';
import useEditorStore, {updateComponent, addComponentToChildrenMap} from '@/store/editorStore';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import usePageStore from '@/store/pageStore';

interface TabComponentProps extends TabsProps {
  componentData: IComponent
  isRendering?: boolean
  canvasLocked?: boolean
}

const TabComponent: FC<TabComponentProps>  = ({componentData, isRendering, canvasLocked}) => {
  const tabItems = componentData.items ?? [];
  const [droppable, setDroppable] = useState(false);
  const tabPanelRef = useRef<(HTMLDivElement)[]>([]);
  const canvasState = useEditorStore((state) => state.canvas);
  const pageState = usePageStore(state => state.canvas);

  const add = () => {
    const items = componentData.items ?? [];

    updateComponent({
      id: componentData.id,
      items: [...items, getDefaultTabItem()]
    })
  }

  const remove = (targetKey: string) => {
    const items = componentData.items ?? [];
    updateComponent({
      items: items.filter((item) => item.id !== targetKey),
      id: componentData.id,
    })
  }

  const onEditHandler = (
    targetKey: MouseEvent | KeyboardEvent | string, 
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey as string);
    }
  }

  const noop = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const panelOnDropHandler = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setDroppable(false);
  
    const componentStr = e.dataTransfer.getData('component');

    if (!componentStr) return;

    const component = JSON.parse(componentStr);
    const panelRef = tabPanelRef.current[index];

    const x = e.pageX;
    const y = e.pageY;

    const clientRect = panelRef.getBoundingClientRect();

    const canvasPositionX = clientRect!.left; 
    const canvasPositionY = clientRect!.top;

    const offsetX = x - canvasPositionX;
    const offsetY = y - canvasPositionY;

    component.style.left = offsetX - component.style.width / 2;
    component.style.top = offsetY - component.style.height / 2;
    component.parentId = componentData.id;

    addComponentToChildrenMap({
      ...component
    });

    const clonedItems = cloneDeep(tabItems);
    const item = clonedItems[index];
    item.children = [...item.children ?? [], component.id];

    updateComponent({
      id: componentData.id,
      items: [...clonedItems],
    })
  }

  const tabPanelHeight = Number(componentData.style.height) - 56;

  const items: TabsProps['items'] = tabItems.map((item, index) => {
    return {
      label: item.label,
      key: item.id,
      closable: !isRendering,
      children: (
        <div 
          ref={el => tabPanelRef.current[index] = el!}
          className={classNames('relative w-full', droppable && !isRendering && 'border-dashed border-2 border-gray-300')} 
          style={{height: tabPanelHeight + 'px'}}
          onDrop={isRendering ? undefined : (e) => panelOnDropHandler(e, index)}
          onDragOver={isRendering ? undefined : noop}
          onDragEnter={isRendering ? undefined : () => setDroppable(true)}
          onDragLeave={isRendering ? undefined : () => setDroppable(false)}
          data-id={item.id}
        >
          {
            item.children?.map((id) => {
              const child = isRendering ? pageState?.childrenMap[id] : canvasState.childrenMap[id];  

              if (!child) {
                return null;
              }

              return <Cmp 
                parent={componentData}
                componentData={child as IComponent} 
                isRendering={isRendering} 
                canvasLocked={canvasLocked} 
                key={child.id} 
              />
            }) ?? item.label
          }
        </div>
      )
    }
  })

  return (
    <Tabs 
      className='h-full'
      onEdit={isRendering ? undefined : onEditHandler}
      items={items} 
      type={isRendering ? 'card' : 'editable-card'}
    ></Tabs>
  )
}

export default TabComponent;
