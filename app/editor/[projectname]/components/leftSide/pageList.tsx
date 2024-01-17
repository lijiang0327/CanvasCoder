import {FC, MouseEvent} from 'react';
import {List, Button, Popconfirm, Tooltip} from 'antd';
import classNames from 'classnames';
import {DeleteOutlined} from '@ant-design/icons';
import {useParams} from 'next/navigation';

import useEditorStore, {setCurrentPage, removePage, clearSelectedComponent} from '@/store/editorStore';
import {deletePage} from '@/utils/pages';

type PageListProps = {};

const PageList: FC<PageListProps> = () => {
  const {currentPage, pages} = useEditorStore((state) => ({currentPage: state.currentPage, pages: state.allPages}))
  const {projectname} = useParams<{projectname: string}>();

  const deleteConfirmHandler = async (e: MouseEvent<HTMLElement>, page: string) => {
    e.stopPropagation();
    e.preventDefault();

    await deletePage(projectname, page);
    removePage(page)
  }

  return <div className="bg-white h-full">
    <List
      size="small"
      split
    >
      {!!pages?.length && pages.map((page) => {
        return (
          <List.Item 
            key={page}
            onClick={() => {
              setCurrentPage(page);
              clearSelectedComponent();
            }}
          >
            <div className={classNames(page === currentPage && 'text-sky-500', 'py-2 flex justify-between w-full items-center')}>
              <span>{page}</span>

              <Popconfirm
                title="提示"
                description="确定要删除页面吗?"
                okText="确定"
                cancelText="取消"
                onCancel={(e) => {e?.stopPropagation(); e?.preventDefault();}}
                onConfirm={(e) => deleteConfirmHandler(e!, page)}
              >
                <Tooltip
                  title="删除页面"
                  placement="right"
                >
                  <Button 
                    type="text" 
                    danger
                    onClick={(e) => {e.preventDefault(); e.stopPropagation();}} 
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </div>
          </List.Item>
        )
      })}
    </List>
  </div>
}

export default PageList;
