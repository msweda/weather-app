import { UnitType } from '@/common/open-weather/enums'
import { AllStores } from '@/src/stores'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import OpenWeatherStore from '../store'

@inject((allStores: AllStores) => ({
  openWeatherStore: allStores.openWeatherStore,
}))
@observer
class UnitSelect extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { classes } = this.props
    return (
      <FormControl className={classes.selectFormControl}>
        <InputLabel htmlFor="weather-units-input">Units</InputLabel>
        <Select
          className={classes.select}
          value={this.injected.openWeatherStore.unitType}
          onChange={this.changeUnitType}
          inputProps={{ id: 'weather-units-input' }}
        >
          <MenuItem className={classes.menuItem} value={UnitType.Scientific}>
            Kelvin
          </MenuItem>
          <MenuItem className={classes.menuItem} value={UnitType.Metric}>
            Celsius
          </MenuItem>
          <MenuItem className={classes.menuItem} value={UnitType.Imperial}>
            Fahrenheit
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  private changeUnitType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.injected.openWeatherStore.setUnitType(event.target.value as UnitType)
    this.injected.openWeatherStore.clearWeather()
    this.injected.openWeatherStore.clearForecast()
  }
}

const styles = (theme: Theme) =>
  createStyles({
    selectFormControl: {
      marginBottom: 20,
    },
    select: {
      color: theme.palette.primary.main,
    },
    menuItem: {
      color: theme.palette.primary.main,
    },
  })

interface Props extends WithStyles<typeof styles> {}

interface InjectedProps extends Props {
  openWeatherStore: OpenWeatherStore
}

export default withStyles(styles)(UnitSelect)
