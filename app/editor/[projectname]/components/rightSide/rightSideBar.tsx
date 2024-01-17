'use client'
import {FC} from 'react';
import {Drawer} from 'antd';

import useEditorStore from '@/store/editorStore';
import PropList from '@/components/PropList';

type RightSideBarProps = {
  className?: string;
}

const RightSideBar: FC<RightSideBarProps> = ({className}) => {
  const selectedComponent = useEditorStore((state) => state.selectedComponent);

  return (
    <Drawer
      placement="right"
      open={!!selectedComponent}
      mask={false}
      autoFocus={false}
      closeIcon={false}
    >
      <div className={className}>
        <PropList />
      </div>
    </Drawer>
  )
}

export default RightSideBar;
