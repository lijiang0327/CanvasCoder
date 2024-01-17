'use client';
import {FC, useState} from 'react';
import {Button, Modal, Form, Input, Select, Popconfirm} from 'antd';
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';

import usePageState, {addState, removeState, updateState} from '@/store/pageStateStore';
import {type StateType} from '@/store/editorStore.d';

type AddPageStateProps = {}

const AddPageState: FC<AddPageStateProps> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentType, setCurrentType] = useState('string');
  const [currentEditVariable, setCurrentEditVariable] = useState<Record<string, unknown> | null>(null);

  const {pageState, pageStateKeys, pageStateType} = 
  usePageState((state) => ({pageState: state.pageState, pageStateType: state.pageStateType, pageStateKeys: state.pageStateKeys}))

  const onConfirmHandler = async () => {
    await form.validateFields();

    const values = form.getFieldsValue();

    currentEditVariable 
      ? updateState(values.key, values.value, values.type)
      : addState(values.key, values.value, values.type);

    onModalCloseHandler();
  }

  const onValuesChangedHandler = async (values: Record<string, unknown>) => {
    if (values.type) {
      values['type'] && setCurrentType(values['type'] as string);
      form.setFieldValue('value', '');
    } 
  }

  const onModalCloseHandler = async () => {
    setModalVisible(false);
    setCurrentEditVariable(null);
    setCurrentType('string');
  }

  const onDeleteHandler = async (key: string) => {
    removeState(key);
  }

  const onEditClickHandler = async (key: string, value: unknown, type: StateType) => {
    setCurrentEditVariable({
      key,
      value,
      type
    });
    setModalVisible(true);
  }

  return <div>
    {!!pageStateKeys.length && pageStateKeys.map((key) => {
      return <div key={key} className="flex items-center justify-between py-2 mb-2">
        <div className="flex gap-4">
          <div>{key}:</div>
          <div>{String(pageState[key])}</div>
        </div>
        <div className="flex">
          <Button icon={<EditOutlined />} onClick={() => onEditClickHandler(key, pageState[key], pageStateType[key])} type="text" />
          <Popconfirm
            title="提示"
            description="确定要删除吗"
            okText="确定"
            cancelText="取消"
            onConfirm={() => onDeleteHandler(key)}
          >
            <Button icon={<DeleteOutlined />} type="text" danger />
          </Popconfirm>
        </div>
      </div>
    })}
    <Button onClick={() => setModalVisible(true)} icon={<PlusOutlined />} />
    <Modal
      open={modalVisible}
      title={currentEditVariable ? '修改变量' : '添加变量'}
      okText="确定"
      cancelText="取消"
      onCancel={onModalCloseHandler}
      destroyOnClose
      onOk={onConfirmHandler}
    >
      <Form
        name="addPageStateForm"
        onValuesChange={onValuesChangedHandler}
        preserve={false}
        form={form}
        initialValues={currentEditVariable ?? {type: 'string', value: '', key: ''}}
      >
        <Form.Item
          label="变量名:"
          name="key"
          rules={[
            {required: true, message: "请输入变量名"}
          ]}
        >
          <Input disabled={!!currentEditVariable} />
        </Form.Item>
        <Form.Item
          label="变量类型:"
          name="type"
        >
          <Select
            options={[
              {
                value: 'string',
                label: 'string'
              },
              {
                value: 'number',
                label: 'number',
              },
              {
                value: 'boolean',
                label: 'boolean'
              }
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          label="变量值:"
          name="value"
          dependencies={["type"]}
          rules={[
            {required: true, message: '请输入变量值'}
          ]}
        >
          {currentType === 'string' && <Input type="string" />}
          {currentType === 'number' && <Input type="number" />}
          {currentType === 'boolean' && <Select
            options={[
              {
                label: 'true',
                value: true,
              },
              {
                label: 'false',
                value: false,
              }
            ]}
          ></Select>}
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default AddPageState;
