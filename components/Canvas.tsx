'use client'
import {FC, DragEvent, MouseEvent as ReactMouseEvent, useRef, useState} from 'react';
import {throttle} from 'lodash';
import classNames from 'classnames';

import useEditorStore, {addComponent, updateCanvasTranslation, setSelectedComponent} from '@/store/editorStore';
import Cmp from '@/components/Cmp';
import isIComponent from '@/utils/isIComponent';

type CanvasProps = {};

const Canvas: FC<CanvasProps> = () => {
  const {canvasState, selectedComponent} = useEditorStore(state => ({canvasState: state.canvas, selectedComponent: state.selectedComponent}));
  const canvasRef = useRef<null | HTMLDivElement>(null);
  const [grabbing, setGrabbing] = useState(false);

  const {
    style,
    translateX,
    translateY,
    zoom,
    children,
    childrenMap,
    locked,
  } = canvasState;

  const canvasOnDropHandler = (e: DragEvent) => {
    const componentStr = e.dataTransfer.getData('component');

    if (!componentStr) return;

    const component = JSON.parse(componentStr);

    const x = e.pageX;
    const y = e.pageY;

    const clientRect = canvasRef.current?.getBoundingClientRect();

    const canvasPositionX = clientRect!.left; 
    const canvasPositionY = clientRect!.top;

    const offsetX = x - canvasPositionX;
    const offsetY = y - canvasPositionY;

    component.style.left = offsetX - component.style.width / 2;
    component.style.top = offsetY - component.style.height / 2;

    addComponent(component);
  }

  const onCanvasMouseDownHandler = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.pageX;
    const startY = e.pageY;

    const move = throttle((moveEvent: MouseEvent) => {
      const x = moveEvent.pageX;
      const y = moveEvent.pageY;

      const offsetX = x - startX;
      const offsetY = y - startY;

      const targetX = translateX + offsetX;
      const targetY = translateY + offsetY;

      updateCanvasTranslation(targetX, targetY);
      setGrabbing(true);
    }, 20)

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
      setGrabbing(false);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  const onCanvasClickHandler = (e: ReactMouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSelectedComponent(canvasState);
  }

  const noop = (e: ReactMouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  }

  const selected = !!selectedComponent && !isIComponent(selectedComponent);

  return (
    <div
      style={{
        ...style,
        'transform': `translateX(${translateX}px) translateY(${translateY}px) scale(${zoom})`,
        minWidth: style?.width,
        maxWidth: style?.width,
        zIndex: 1000,
      }}
      className={classNames(
        'shadow flex-1', 
        grabbing ? 'cursor-grabbing' : 'cursor-grab', 
        selected && 'border'
      )}
      onDrop={canvasOnDropHandler}
      onDragOver={noop}
      onMouseDown={locked ? undefined : onCanvasMouseDownHandler}
      onMouseUp={noop}
      onClick={onCanvasClickHandler}
      ref={canvasRef}
      id="editorCanvas"
    >
      {children?.map((id) => {
        const child = childrenMap[id];
        return (
          <Cmp parent={canvasState} componentData={child} key={id} />
        )
      })}
    </div>
  )
}

export default Canvas;
