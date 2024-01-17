import {CSSProperties, FC} from 'react';
import {Typography} from 'antd';
import {type TitleProps} from 'antd/es/typography/Title'
import usePageStateStore from '@/store/pageStateStore';
import { IComponent } from '@/store/editorStore.d';

const {Title} = Typography;
interface TitleComponentProps extends TitleProps {
  componentData: IComponent
  isRendering: boolean
};

const TextComponent: FC<TitleComponentProps> = ({children, style, componentData, isRendering, ...rest}) => {
  const pageState = usePageStateStore(state => state.pageState);

  const text = String(componentData.variable ? pageState[componentData.variable] : children);

  const titleStyle: CSSProperties = {
    ...style,
    margin: 0, 
    userSelect: isRendering ? 'all' : 'none', 
    cursor: isRendering ? 'default' : 'pointer'
  }

  return <Title {...rest} style={{...titleStyle}} >{text}</Title>
}

export default TextComponent;
