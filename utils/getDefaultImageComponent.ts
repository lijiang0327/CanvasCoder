import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

const getDefaultImageComponent = (): IComponent => {
  return {
    type: 'image',
    style: {
      ...getDefaultComponentStyle(),
      width: 200,
      height: 200
    },
    id: getUniqueId(),
    value: '',
    draggable: true,
    editable: true,
  };
}

export default getDefaultImageComponent;
