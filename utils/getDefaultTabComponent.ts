import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

export const getDefaultTabItem = (label: string = 'New Tab') => {
  return {
    label,
    id: getUniqueId()
  }
}

const getDefaultTabComponent = (): IComponent => {
  return {
    type: 'tab',
    style: {
      ...getDefaultComponentStyle(),
      width: 500,
      height: 300
    },
    id: getUniqueId(),
    draggable: true,
    editable: true,
    items: [getDefaultTabItem('Tab1'), getDefaultTabItem('Tab2')]
  };
}

export default getDefaultTabComponent;
