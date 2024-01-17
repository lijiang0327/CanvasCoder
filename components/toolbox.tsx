import {FC, DragEvent} from 'react';
import {Collapse, Row, Col, type CollapseProps} from 'antd';
import {
  AdsClickOutlined, 
  TextFormat, 
  TextFields as TextFieldsIcon, 
  Input as InputIcon,
  CheckBox as CheckBoxIcon,
  RadioButtonChecked as RadioIcon,
  ImageOutlined as ImageIcon,
  Title as TitleIcon,
  TabOutlined as TabOutlinedIcon
} from '@mui/icons-material';

import {addComponent} from '@/store/editorStore';
import type {IComponentType} from '@/store/editorStore.d';
import getDefaultButtonComponent from '@/utils/getDefaultButtonComponent';
import getDefaultTextComponent from '@/utils/getDefaultTextComponent';
import getDefaultInputComponent from '@/utils/getDefaultInputComponent';
import getDefaultTitleComponent from '@/utils/getDefaultTitleComponent';
import getDefaultTabComponent from '@/utils/getDefaultTabComponent';
import getDefaultImageComponent from '@/utils/getDefaultImageComponent';

type ToolboxProps = {};

const Toolbox: FC<ToolboxProps> = () => {
  const basicComponents = [
    {
      type: 'title',
      name: 'Title',
      icon: <TitleIcon />
    },
    {
      type: 'text',
      name: 'Text',
      icon: <TextFormat />
    },
    {
      type: 'button',
      name: 'Button',
      icon: <AdsClickOutlined />
    },
    {
      type: 'input',
      name: 'Input',
      icon: <InputIcon />
    },
    {
      type: 'tab',
      name: 'Tab',
      icon: <TabOutlinedIcon />
    },
    {
      type: 'image',
      name: 'Image',
      icon: <ImageIcon />
    },
    // {
    //   type: 'textarea',
    //   name: 'Textarea',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   type: 'checkbox',
    //   name: 'Checkbox',
    //   icon: <CheckBoxIcon />
    // },
    // {
    //   type: 'radio',
    //   name: 'Radio',
    //   icon: <RadioIcon />
    // },
  ];

  const onBasicComponentClick = (type: IComponentType) => {
    switch(type) {
      case 'button':
        addComponent(getDefaultButtonComponent());
        break;
      case 'text':
        addComponent(getDefaultTextComponent());
        break;
      case 'title':
          addComponent(getDefaultTitleComponent());
          break;
      case 'input':
        addComponent(getDefaultInputComponent());
        break;
      case 'tab':
        addComponent(getDefaultTabComponent());
        break;
      case 'image':
        addComponent(getDefaultImageComponent());
        break;
    }
  }

  const onBasicComponentDragStartHandler = (e: DragEvent, type: IComponentType) => {
    switch(type) {
      case 'button':
        e.dataTransfer.setData('component', JSON.stringify(getDefaultButtonComponent()));
        break;
      case 'text':
        e.dataTransfer.setData('component', JSON.stringify(getDefaultTextComponent()));
        break;
      case 'title':
          e.dataTransfer.setData('component', JSON.stringify(getDefaultTitleComponent()));
          break;
      case 'input':
        e.dataTransfer.setData('component', JSON.stringify(getDefaultInputComponent()));
        break;
      case 'tab':
        e.dataTransfer.setData('component', JSON.stringify(getDefaultTabComponent()));
        break;
      case 'image':
        e.dataTransfer.setData('component', JSON.stringify(getDefaultImageComponent()));
        break;
    }
  }

  const items: CollapseProps['items'] = [
    {
      label: '基础组件',
      key: '1',
      children: (
        <Row gutter={[8, 16]}>
          {basicComponents.map((component) => {
            return (
              <Col span={12} key={component.type}>
                <div 
                  className="p-2 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100"
                  onClick={() => onBasicComponentClick(component.type as IComponentType)}
                  draggable
                  onDragStart={(e) => onBasicComponentDragStartHandler(e, component.type as IComponentType)}
                >
                  {component.icon}
                  <span>{component.name}</span>
                </div>
              </Col>
            )
          })}
        </Row>
      )
    }, {
      label: '高级组件',
      key: '2',
      children: (
        <div>高级组件</div>
      )
    }
  ]

  return <div>
    <Collapse items={items} defaultActiveKey={['1']}></Collapse>
  </div>
}

export default Toolbox;
