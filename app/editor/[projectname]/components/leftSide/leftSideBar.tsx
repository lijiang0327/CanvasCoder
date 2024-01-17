'use client'

import {FC} from 'react';
import {Tabs, type TabsProps} from 'antd';
import classNames from 'classnames';

import Toolbox from '../../../../../components/toolbox';
import PageList from './pageList';

type LeftSideBarProps = {
  className?: string;
}

const LeftSideBar: FC<LeftSideBarProps> = ({className}) => {

  const tabItems = [
    {
      label: '组件',
      key: '1',
      children: <Toolbox />
    },
    {
      label: '页面',
      key: '2',
      children: <PageList />
    }
  ] as TabsProps['items']

  return (
    <div className={classNames(className, 'w-40 h-full')}>
      <Tabs defaultActiveKey="1" items={tabItems} centered></Tabs>
    </div>
  )
}

export default LeftSideBar;
