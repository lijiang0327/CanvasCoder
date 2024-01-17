import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

const getDefaultTextComponent = (): IComponent => {
  return {
    type: 'text',
    style: {
      ...getDefaultComponentStyle(),
      width: 30,
      height: 24,
      fontSize: 14,
    },
    id: getUniqueId(),
    text: 'Text',
    draggable: true,
    editable: true,
  };
}

export default getDefaultTextComponent;
