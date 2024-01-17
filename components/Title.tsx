import {FC} from 'react';
import {Typography} from 'antd';
import {type TitleProps} from 'antd/es/typography/Title'
import usePageStateStore from '@/store/pageStateStore';
import { IComponent } from '@/store/editorStore.d';

const {Title} = Typography;
interface TitleComponentProps extends TitleProps {
  componentData: IComponent
};

const TextComponent: FC<TitleComponentProps> = ({children, style, componentData, ...rest}) => {
  const pageState = usePageStateStore(state => state.pageState);

  const text = String(componentData.variable ? pageState[componentData.variable] : children);

  return <Title {...rest} style={{...style, margin: 0, userSelect: 'none', cursor: 'pointer'}} >{text}</Title>
}

export default TextComponent;
