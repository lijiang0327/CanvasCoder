import {FC, CSSProperties} from 'react';
import ReactEcharts from 'echarts-for-react';

import {IComponent} from '@/store/editorStore.d';

interface PieChartComponentProps extends CSSProperties {
  componentData: IComponent
  isRendering: boolean
} 

const PieChartComponent: FC<PieChartComponentProps> = ({componentData}) => {
  const option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <ReactEcharts 
      option={option}
      opts={{
        height: Number(componentData.style.height),
        width: Number(componentData.style.width),
      }}
    ></ReactEcharts>
  )
}

export default PieChartComponent;
