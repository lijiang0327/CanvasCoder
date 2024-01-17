import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

const getDefaultInputComponent = (): IComponent => {
  return {
    type: 'input',
    style: {
      ...getDefaultComponentStyle(),
      width: 200,
      height: 40
    },
    id: getUniqueId(),
    value: '',
    draggable: true,
    editable: true,
  };
}

export default getDefaultInputComponent;
