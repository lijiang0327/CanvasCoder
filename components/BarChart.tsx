import {FC, CSSProperties} from 'react';
import ReactEcharts from 'echarts-for-react';

import {IComponent} from '@/store/editorStore.d';

interface BarChartComponentProps extends CSSProperties {
  componentData: IComponent
  isRendering: boolean
} 

const BarChartComponent: FC<BarChartComponentProps> = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  }

  return <ReactEcharts option={option}></ReactEcharts>
}

export default BarChartComponent;
