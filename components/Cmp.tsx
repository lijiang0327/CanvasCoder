import {FC, Fragment, MouseEvent as ReactMouseEvent, useState} from 'react';
import {cloneDeep, omit, pick, throttle} from 'lodash';
import {Popconfirm, Button as AntdButton} from 'antd';
import {CloseCircleOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons';

import type {IComponent, ICanvas} from '@/store/editorStore.d';
import useEditorStore, {setSelectedComponent, updateComponent, removeComponent} from '@/store/editorStore';
import Draggable from '@/components/Draggable';
import isIComponent from '@/utils/isIComponent';
import Input from './Input';
import Button from './Button';
import Text from './Text';
import Title from './Title';
import Tab from './Tab';
import Image from './Image';
import PieChart from './PieChart';
import BarChart from './BarChart';

type CmpProps = {
  componentData: IComponent
  canvasLocked?: boolean
  isRendering?: boolean
  parent: IComponent | ICanvas
}

const Cmp: FC<CmpProps> = ({componentData, canvasLocked, isRendering = false, parent}) => {

  const {id, text, type, style, draggable, editable, locked} = componentData;
  const selectedComponent = useEditorStore((state) => state.selectedComponent);
  const selected = isIComponent(selectedComponent) ? selectedComponent?.id === id : false;

  const outerStyle = pick(style, [
    'position',
    'top',
    'left',
    'width',
    'height'
  ]);

  const innerStyle = omit(style, [
    'position',
    'top',
    'left'
  ])

  const onCmpClickHandler = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedComponent(componentData);
  }

  const noop = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onStretchBoxMouseDown = (event: ReactMouseEvent<HTMLDivElement> & {target: {dataset: DOMStringMap}}) => {
    event.preventDefault();
    event.stopPropagation();
    const direction = event.target.dataset.direction;

    if (!direction || locked) {
      return;
    }

    let startX = event.pageX;
    let startY = event.pageY;

    const styleObject = cloneDeep(componentData.style);

    const move = throttle((e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      if (direction?.includes('top')) {
        (styleObject.height as number) -= disY;
        (styleObject.top as number) += disY;
      } else if (direction?.includes('bottom')) {
        (styleObject.height as number) += disY;
      }

      if (direction?.includes('left')) {
        (styleObject.width as number) -= disX;
        (styleObject.left as number) += disX;
      } else if (direction?.includes('right')) {
        (styleObject.width as number) += disX;
      }

      updateComponent({
        id,
        style: styleObject
      });

      startX = x;
      startY = y;
    }, 50);

    const up = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }

  const onDeleteConfirmHandler = (e: ReactMouseEvent | undefined) => {
    e?.preventDefault();
    e?.stopPropagation();
    removeComponent(componentData);
  }

  const onLockClickHandler = (e: ReactMouseEvent) => {
    noop(e);
    updateComponent({
      id,
      locked: !locked
    })
  }

  const Wrapper = draggable && !isRendering && !locked ? Draggable : Fragment;
  const componentEditable = editable && !canvasLocked && !isRendering;

  return (
    <Wrapper
      parent={parent}
    >
      {componentEditable && selected && (
        <div 
          onClick={noop}
          style={{
            ...outerStyle, 
            width: (Number(innerStyle.width)) + 16, 
            height: (Number(innerStyle.height)) + 16, 
            border: '2px solid rgb(100, 116, 139)',
            zIndex: 1000,
          }} 
          className='flex items-center justify-center translate-x-[-10px] translate-y-[-10px]'
        >
          <div 
            className='absolute left-0 top-0 w-2 h-2 rounded bg-slate-500 translate-x-[-5px] translate-y-[-5px] cursor-nwse-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="left, top"
          ></div>
          <div 
            className='absolute top-0 w-2 h-2 rounded bg-slate-500 translate-y-[-5px] cursor-ns-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="top"
          ></div>
          <div 
            className='absolute right-0 top-0 w-2 h-2 rounded bg-slate-500 translate-x-[5px] translate-y-[-5px] cursor-nesw-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="right, top"
          ></div>
          <div 
            className='absolute left-0 w-2 h-2 rounded bg-slate-500 translate-x-[-5px] cursor-ew-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="left"
          ></div>
          <div 
            className='absolute right-0 w-2 h-2 rounded bg-slate-500 translate-x-[5px] cursor-ew-resize'
            onMouseDown={onStretchBoxMouseDown} 
            onClick={noop} 
            data-direction="right"
          ></div>
          <div 
            className='absolute left-0 bottom-0 w-2 h-2 rounded bg-slate-500 translate-x-[-5px] translate-y-[5px] cursor-nesw-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="left, bottom"
          ></div>
          <div 
            className='absolute right-0 bottom-0 w-2 h-2 rounded bg-slate-500 translate-x-[5px] translate-y-[5px] cursor-nwse-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="right, bottom"
          ></div>
          <div 
            className='absolute bottom-0 w-2 h-2 rounded bg-slate-500 translate-y-[5px] cursor-ns-resize'
            onMouseDown={onStretchBoxMouseDown}
            onClick={noop}
            data-direction="bottom"
          ></div>
          <div
            className='absolute right-0 top-0 translate-x-8 translate-y-[-32px]'
          >
            <Popconfirm
              title="提示"
              description="确定要删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={onDeleteConfirmHandler}
              onCancel={(e) => {e?.stopPropagation(); e?.preventDefault()}}
            >
              <AntdButton 
                icon={<CloseCircleOutlined />}
                onClick={noop}
                size='small'
                type="text"
                danger
              ></AntdButton>
            </Popconfirm>
          </div>
          <div
            className='absolute left-0 top-0 translate-x-[-32px] translate-y-[-32px]'
          >
            <AntdButton 
              icon={locked ? <LockOutlined /> : <UnlockOutlined />}
              onClick={onLockClickHandler}
              size='small'
              type="text"
            ></AntdButton>
          </div>
        </div>
      )}
      <div 
        style={{...outerStyle, zIndex: selected ? 1000 : 100}} 
        data-id={id}
        onClick={componentEditable ? onCmpClickHandler : undefined}
      >
        {type === 'button' && <Button type="primary" style={innerStyle} isRendering={isRendering} componentData={componentData}>{text}</Button>}
        {type === 'text' && <Text componentData={componentData} isRendering={isRendering} style={innerStyle}>{text}</Text>}
        {type === 'title' && <Title componentData={componentData} isRendering={isRendering} style={innerStyle}>{text}</Title>}
        {type === 'input' && <Input type="text" componentData={componentData} style={innerStyle} />}
        {type === 'tab' && <Tab componentData={componentData} isRendering={isRendering} canvasLocked={canvasLocked} style={innerStyle} />}
        {type === 'image' && <Image componentData={componentData} preview={false} isRendering={isRendering} alt={String(componentData.id)} />}
        {type === 'pieChart' && <PieChart componentData={componentData} isRendering={isRendering} />}
        {type === 'barChart' && <BarChart componentData={componentData} isRendering={isRendering} />}
      </div>
    </Wrapper>
  )
}

export default Cmp;
