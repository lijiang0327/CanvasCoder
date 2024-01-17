import {type IComponent} from '@/store/editorStore.d';
import getUniqueId from './getUniqueId';
import getDefaultComponentStyle from './getDefaultComponentStyle';

const getDefaultButtonComponent = (): IComponent => {
  return {
    type: 'button',
    style: {
      ...getDefaultComponentStyle(),
      width: 75,
      height: 32
    },
    id: getUniqueId(),
    text: 'button',
    draggable: true,
    editable: true,
  }
}

export default getDefaultButtonComponent;
