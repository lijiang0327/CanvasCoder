import {ChangeEventHandler, FC} from 'react';
import {Input, type InputProps} from 'antd';

import {IComponent} from '@/store/editorStore.d';
import usePageStateStore, {updateState} from '@/store/pageStateStore';

interface InputComponentProps extends InputProps {
  componentData: IComponent
}

const InputComponent: FC<InputComponentProps> = ({style, componentData, ...rest}) => {
  const {pageState, pageStateType} = usePageStateStore(state => ({pageState: state.pageState, pageStateType: state.pageStateType}));
  const {text, variable} = componentData;

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateState(variable!, e.target.value, pageStateType[variable!])
  }
  
  const value = (() => {
    if (!variable) {
      return text;
    }
    if (pageStateType[variable] === 'string') {
      return String(pageState[variable]);
    }
    if (pageStateType[variable] === 'number') {
      return Number(pageState[variable]);
    }
    return ''
  })();

  return (
    <Input 
      onChange={variable ? onChangeHandler : undefined}
      value={value}
      {...rest} 
      style={{...style, transition: 'none'}} 
    />
  )
}

export default InputComponent;
