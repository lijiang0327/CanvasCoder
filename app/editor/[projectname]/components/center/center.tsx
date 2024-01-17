'use client';
import {FC, MouseEvent} from 'react';

import SplitContainer from '@/components/SplitContainer';
import Canvas from '@/components/Canvas';
import {clearSelectedComponent} from '@/store/editorStore';
import FlowEditor from '@/components/FlowEditor';

type CenterProps = {
  className?: string;
}

const Center: FC<CenterProps> = ({className}) => {

  const onClickHandler = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    clearSelectedComponent();
  }

  return (
    <div 
      className={className}
      onClick={onClickHandler}
    >
      <SplitContainer
        topChild={<Canvas />}
        bottomChild={<FlowEditor />}
        defaultTopHeight={typeof window === 'undefined' ? 0 : (window.innerHeight - 200)}
      />
    </div>
  )
}

export default Center;
