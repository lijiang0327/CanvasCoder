import {
  CollapseProps, 
  Input, 
  Button, 
  Modal, 
  Image as AntdImage, 
  Popconfirm, 
  Empty, 
  Upload, 
  UploadFile, 
  message
} from "antd";
import {FC, useEffect, useState, useCallback, ChangeEventHandler} from 'react';

import PropItem from "@/components/PropItem";
import {GetItemsType, Prop} from './prop';
import {getAllImages, deleteImage} from '@/utils/images';
import {DeleteOutlined, CheckOutlined} from '@ant-design/icons';

type ImageItemProps = {
  width: string | number
  height: string | number
  src: string
  onSelect: (src: string) => Promise<void>
  onDelete: (src: string) => Promise<void>
}

const ImageItem: FC<ImageItemProps> = ({width, height, src, onSelect, onDelete}) => {
  return <div className="flex flex-col gap-2">
    <AntdImage 
      src={src} 
      width={width} 
      height={height}
    />
    <div className="flex justify-around">
      <Popconfirm
        onConfirm={() => onDelete(src)}
        okText="确定"
        cancelText="取消"
        title="提示"
        description="确定要删除图片吗?"
      >
        <Button 
          size="small" 
          danger 
          ghost 
          icon={<DeleteOutlined />} 
        />
      </Popconfirm>
      <Button 
        size="small" 
        type="primary" 
        ghost 
        icon={<CheckOutlined />} 
        onClick={() => onSelect(src)} 
      />
    </div>
  </div>
}

type ImageStoreProps = {
  onPropUpdateHandler: (key: string, value: unknown) => void
  imageUrl: string
}

const {Dragger} = Upload;

const ImageStore: FC<ImageStoreProps> = ({onPropUpdateHandler, imageUrl}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);

  const fetchAllImages = useCallback(async () => {
    const result = await getAllImages();

    setAllImages(result);
  }, [])

  useEffect(() => {
    fetchAllImages();
  }, [fetchAllImages])

  const onDeleteHandler = async (src: string) => {
    const result = await deleteImage(src);
    if (result.success) {
      fetchAllImages();
    }
  }

  const onSelectHandler = async (src: string) => {
    onPropUpdateHandler('src', src);
    setModalVisible(false);
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onPropUpdateHandler('src', e.target.value);
  }

  const onUpLoadChangeHandler = async (info: {file: UploadFile}) => {
    const {status} = info.file;

    if (status === 'done') {
      message.success('上传成功');
      fetchAllImages();
    } else if (status === 'error') {
      message.success('上传失败');
    }
  }

  return <>
    <div className="w-full">
      <Input placeholder="输入图片地址" value={imageUrl} onChange={onChangeHandler} />
      <Button className="mt-2" type="primary" onClick={() => setModalVisible(true)}>在图库中选择</Button>
    </div>
    <Modal 
      open={modalVisible} 
      title="选择图片"
      okText="确定"
      cancelText="取消"
      width="60vw"
      footer={false}
      onCancel={() => setModalVisible(false)}
    >
      <div className="h-[60vh] overflow-auto flex flex-wrap py-8 px-4 gap-4">
        {allImages.map((image) => {
          return <ImageItem 
            key={image} 
            src={image} 
            width={100} 
            height={100} 
            onSelect={onSelectHandler} 
            onDelete={onDeleteHandler}
          />
        })}
        {!allImages.length && <div className="mx-auto mt-20"><Empty /></div>}
      </div>
      <Dragger
        action="/api/images"
        name="file"
        multiple={false}
        onChange={onUpLoadChangeHandler}
        showUploadList={false}
      >
        <p>点击或拖拽上传图片</p>
      </Dragger>
    </Modal>
  </>
}


const getItems: GetItemsType = (
  component, 
  onPropUpdateHandler, 
  onStyleUpdateHandler,
) => {
  const props = <>
    <PropItem label="ID">
      <span>{component.id}</span>
    </PropItem>
    <PropItem label="图片地址">
      <ImageStore imageUrl={component.src ?? ''} onPropUpdateHandler={onPropUpdateHandler} />
    </PropItem>
  </>

  const styles = <>
    <PropItem label="宽度">
      <Input
        value={component.style.width} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('width', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="高度">
      <Input
        value={component.style.height} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('height', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="左">
      <Input
        value={component.style.left} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('left', Number(e.currentTarget.value))} 
      />
    </PropItem>
    <PropItem label="顶">
      <Input
        value={component.style.top} 
        type="number"
        onInput={(e) => onStyleUpdateHandler('top', Number(e.currentTarget.value))} 
      />
    </PropItem>
  </>

  const items: CollapseProps['items'] = [
    {
      label: '属性',
      key: '1',
      children: (
        <>
          {props}
        </>
      )
    }, {
      label: '样式',
      key: '2',
      children: (
        <>
          {styles}
        </>
      )
    }
  ];

  return items;
}

export default {
  getItems
} as Prop;
