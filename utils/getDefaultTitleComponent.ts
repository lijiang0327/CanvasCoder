import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

const getDefaultTextComponent = (): IComponent => {
  return {
    type: 'title',
    style: {
      ...getDefaultComponentStyle(),
      width: 60,
      height: 32,
      fontSize: 20,
    },
    id: getUniqueId(),
    text: 'Title',
    draggable: true,
    editable: true,
  };
}

export default getDefaultTextComponent;
