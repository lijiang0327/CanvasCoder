import type { IComponent } from '@/store/editorStore.d';

import getDefaultComponentStyle from './getDefaultComponentStyle';
import getUniqueId from './getUniqueId';

const getDefaultPieChartComponent = (): IComponent => {
  return {
    type: 'pieChart',
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

export default getDefaultPieChartComponent;
