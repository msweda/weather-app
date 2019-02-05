import { BasicPage } from '@/common/components'
import * as React from 'react'
import WeatherWidget from './WeatherWidget'

const Weather: React.FC<any> = () => {
  return (
    <div>
      <BasicPage>
        <WeatherWidget />
      </BasicPage>
    </div>
  )
}

export default Weather
