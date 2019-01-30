import { RootRoute } from '@/common/enums'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import Filter5Icon from '@material-ui/icons/Filter5'
import * as React from 'react'

interface MobileMenuItem {
  icon: JSX.Element
  label: string
  route: RootRoute
}

const mobileMenuItems: MobileMenuItem[] = [
  {
    icon: <AcUnitIcon />,
    label: 'Weather',
    route: RootRoute.Weather,
  },
  {
    icon: <Filter5Icon />,
    label: 'Forecast',
    route: RootRoute.Forecast,
  },
]

export default mobileMenuItems
