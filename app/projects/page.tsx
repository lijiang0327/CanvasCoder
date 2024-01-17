'use client'
import {useEffect, useMemo, useState, useCallback} from 'react';
import {Table, Button, Flex, Popconfirm, Input, Modal, Form, message} from 'antd';
import Link from 'next/link';

import {getProjects, createProject, deleteProject} from '@/utils/projects';

type DataType = {
  projectName: string;
  index: number;
}

const Projects = () => {
  const {Search} = Input;
  const [projects, setProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [createProjectLoading, setCreateProjectLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const result = await getProjects();
    setLoading(false);

    if (result.success) {
      setProjects(result.data);
    }
  }, [])

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);


  const onDeleteHandler = async (projectName: string) => {
    const result = await deleteProject(projectName);

    if (result.success) {
      fetchProjects();
    }
  }

  const onAddHandler = async () => {
    await form.validateFields()

    const projectName = form.getFieldValue('projectName');

    setCreateProjectLoading(true);
    const result = await createProject(projectName);
    setCreateProjectLoading(false);

    if (result.success) {
      setModalVisible(false);
      fetchProjects();
    } else {
      message.error(result.reason);
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (projectName: string) => {
        return <Link href={`/editor/${projectName}`}>{projectName}</Link>
      }
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (_: unknown, record: DataType) => {
        return <Flex>
          <Popconfirm
            okText="确定"
            cancelText="取消"
            title="提示"
            description="确定要删除项目吗?"
            onConfirm={() => onDeleteHandler(record.projectName)}
          >
            <Button>删除</Button>
          </Popconfirm>
        </Flex>
      }
    }
  ];

  const projectsData: DataType[] = useMemo(() => {
    return projects.filter(projectName => projectName.includes(searchStr)).map((projectName, index) => ({
      index: index + 1,
      projectName,
    }));
  }, [projects, searchStr])

  return <div className="p-4">
    <div className="w-full flex items-center gap-4">
      <label className="flex w-fit items-center">
        <div className="w-[100px]">项目名称:</div>
        <Search 
          enterButton="搜索"
          allowClear
          onSearch={(value) => setSearchStr(value)}
        />
      </label>
      <Button 
        type="primary"
        onClick={() => setModalVisible(true)}
      >添加</Button>
    </div>
    <div className="h-4"></div>
    <Table
      columns={columns}
      dataSource={projectsData}
      loading={loading}
    ></Table>

    <Modal
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      onOk={onAddHandler}
      destroyOnClose
      cancelText="取消"
      okText="确定"
      title="添加项目"
      confirmLoading={createProjectLoading}
    >
      <Form
        form={form}
        preserve={false}
        className="pt-4"
        name="create"
      >
        <Form.Item
          label="项目名称"
          name="projectName"
          rules={[
            {
              required: true,
              message: '请输入项目名称'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default Projects;