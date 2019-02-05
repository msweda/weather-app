import { BasicPage } from '@/common/components'
import * as React from 'react'
import ForecastWidget from './ForecastWidget'

const Forecast: React.FC<any> = () => {
  return (
    <div>
      <BasicPage>
        <ForecastWidget />
      </BasicPage>
    </div>
  )
}

export default Forecast
