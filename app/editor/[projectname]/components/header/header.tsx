'use client'

import {FC} from 'react';
import classNames from 'classnames';
import {Button, Flex, Tooltip, Popconfirm, message, Divider} from 'antd';
import {SaveOutlined, ExportOutlined, RestOutlined, FileAddOutlined, LockOutlined, UnlockOutlined} from '@ant-design/icons';
import {useParams, useRouter} from 'next/navigation';

import useEditorStore, {initDefaultCanvasData, updateCanvasProp, addPage, setPages} from '@/store/editorStore';
import useGlobalStateStore from '@/store/globalStateStore';
import usePageStateStore from '@/store/pageStateStore';
import {savePage, getPages} from '@/utils/pages';

type HeaderProps = {
  className?: string;
}

const Header: FC<HeaderProps> = ({className}) => {
  const {projectname} = useParams<{projectname: string}>();
  const {canvas, currentPage, allPages} = useEditorStore(state => ({canvas: state.canvas, currentPage: state.currentPage, allPages: state.allPages}));
  const pageState = usePageStateStore(state => state.pageState);
  const globalState = useGlobalStateStore(state => state.globalState);
  const router = useRouter();

  const onResetCanvasPosition = () => {
    updateCanvasProp({
      translateX: 0,
      translateY: 0,
    })
  }

  const refreshPages = async () => {
    const result = await getPages(projectname);

    if (result.success) {
      setPages(result.data);
    }
  }

  const validatePageName = (pageName: string) => {
    if (currentPage === '未命名' && allPages.includes(pageName)) {
      return false;
    }

    return true;
  }

  const onSaveHandler = async () => {
    if (!validatePageName(canvas.title + '.json')) {
      message.error('page name has already been used');
      return;
    }

    const result = await savePage(projectname, {
      canvas,
      pageState,
      globalState,
      title: canvas.title
    });

    if (result.success) {
      message.success('保存成功');
      refreshPages();
    } else {
      message.error(result.reason);
    }
  }

  const onExitHandler = async () => {
    router.push('/projects');
  }

  const onAddNewHandler = async () => {
    initDefaultCanvasData();
    addPage('未命名');
  }

  const onLockHandler = async () => {
    updateCanvasProp({
      locked: !canvas.locked
    })
  }

  return (
    <div className={classNames(className, 'flex items-center justify-center')}>
      <h1 className="absolute left-2 text-2xl">{canvas.title}</h1>
      <Flex gap={2} align="center">
        <Tooltip
          title="退出编辑"
        >
          <Popconfirm
            title="提示"
            description="确定要退出吗?"
            onConfirm={onExitHandler}
            okText="确定"
            cancelText="取消"
            placement="bottom"
          >
            <Button type="primary" icon={<ExportOutlined />} />
          </Popconfirm>
        </Tooltip>
        <Divider type="vertical" className="border-sky-500 h-6" />
        <Tooltip
          title="新建页面"
        >
          <Button 
            type="primary" 
            icon={<FileAddOutlined />} 
            onClick={onAddNewHandler}
          />
        </Tooltip>
        <Tooltip
          title="保存"
        >
          <Button 
            type="primary" 
            icon={<SaveOutlined />} 
            onClick={onSaveHandler}
          />
        </Tooltip>
        <Tooltip
          title="复位画布位置"
        >
          <Button 
            onClick={onResetCanvasPosition}
            type="primary" 
            icon={<RestOutlined />} 
          />
        </Tooltip>
        <Divider type="vertical" className="border-sky-500 h-6" />
        <Tooltip
          title={canvas.locked ? '解锁画布' : '锁定画布'}
        >
          <Button 
            onClick={onLockHandler}
            type="primary" 
            icon={canvas.locked ? <LockOutlined /> : <UnlockOutlined />} 
          />
        </Tooltip>
      </Flex>
    </div>
  )
}

export default Header;
