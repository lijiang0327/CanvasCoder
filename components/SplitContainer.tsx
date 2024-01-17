'use client'

import {FC, ReactNode, useState, MouseEventHandler, useEffect} from 'react';
import classNames from 'classnames';
import {throttle} from 'lodash';
import { clearSelectedComponent } from '@/store/editorStore';

type SplitContainerProps = {
  topChild?: ReactNode;
  bottomChild?: ReactNode;
  defaultTopHeight: number;
  className?: string;
}

const SplitContainer: FC<SplitContainerProps> = ({topChild, bottomChild, defaultTopHeight, className}) => {
  const [topHeight, setTopHeight] = useState<number | undefined>();

  useEffect(() => {
    defaultTopHeight && setTopHeight(defaultTopHeight);
  }, [defaultTopHeight]);

  const onDividerMouseDownHandler: MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let startY = e.pageY;
    const windowHeight = window.innerHeight;
    const maxHeight = windowHeight - 100;

    const move = throttle((moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const deltaY = startY - moveEvent.pageY;

      setTopHeight((h) => Math.min(maxHeight, h ? h - deltaY : 500));
      startY = moveEvent.pageY;
    }, 20);

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }

  return (
    <div className={classNames("w-full h-full overflow-hidden", className)}>
      <div 
        className="overflow-hidden flex items-center justify-center"
        onClick={clearSelectedComponent}
        style={{
          height: topHeight ? `${topHeight}px` : '800px'
        }}
      >
        {topChild}
      </div>
      <div 
        className={classNames("w-full h-1 shadow-md bg-slate-200 cursor-row-resize")} 
        onMouseDown={onDividerMouseDownHandler}
      />
      <div
        className="overflow-hidden w-full h-full flex-1 flex items-center justify-center relative"
      > 
        {bottomChild}
      </div>
    </div>
  )
}

export default SplitContainer;
