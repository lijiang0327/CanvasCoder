import {FC, CSSProperties} from 'react';
import ReactEcharts from 'echarts-for-react';

import {IComponent} from '@/store/editorStore.d';

interface BarChartComponentProps extends CSSProperties {
  componentData: IComponent
  isRendering: boolean
} 

const BarChartComponent: FC<BarChartComponentProps> = ({componentData, isRendering}) => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        name: 'AA',
        barGap: 0,
        type: 'bar'
      },
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        name: 'BB',
        type: 'bar'
      }
    ]
  }

  return (
    <ReactEcharts 
      option={option}
      opts={{
        width: Number(componentData.style.width),
        height: Number(componentData.style.height),
      }}
    ></ReactEcharts>
  )
}

export default BarChartComponent;
