import { UnitSelect, Weather } from '@/common/open-weather/components'
import OpenWeatherStore from '@/common/open-weather/store'
import { noGeolocation, weatherFailed } from '@/common/open-weather/strings'
import { isGeolocationAvailable } from '@/common/utils'
import { AllStores } from '@/src/stores'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

@inject((allStores: AllStores) => ({
  openWeatherStore: allStores.openWeatherStore,
}))
@observer
class WeatherWidget extends React.Component<Props> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    if (!isGeolocationAvailable()) {
      return <Typography>{noGeolocation}</Typography>
    }

    const { classes } = this.props

    return (
      <React.Fragment>
        <div className={classes.userInput}>
          <UnitSelect />
          {this.renderGetWeatherButton()}
        </div>
        {this.renderWeatherBlock()}
      </React.Fragment>
    )
  }

  private renderGetWeatherButton = () => {
    if (this.injected.openWeatherStore.weatherInProgress) {
      return <CircularProgress />
    }
    return (
      <Button variant="contained" color="primary" onClick={this.getWeather}>
        Get Weather
      </Button>
    )
  }

  private renderWeatherBlock = () => {
    if (
      this.injected.openWeatherStore.weatherSucceeded &&
      this.injected.openWeatherStore.weatherData !== undefined
    ) {
      const { classes } = this.props
      return (
        <div className={classes.weatherBlock}>
          <Typography variant="h6" color="textSecondary">
            The current temperature in your area is:
          </Typography>
          <Typography variant="h1" color="primary">
            {this.injected.openWeatherStore.weatherData.main.temp}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Conditions:
          </Typography>
          <Weather
            weather={this.injected.openWeatherStore.weatherData.weather}
          />
        </div>
      )
    }

    if (this.injected.openWeatherStore.weatherFailed) {
      return <Typography>{weatherFailed}</Typography>
    }

    return null
  }

  private getWeather = () => {
    this.injected.openWeatherStore.getWeather()
  }
}

const styles = () =>
  createStyles({
    userInput: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      '& > *': {
        margin: 10,
      },
    },
    weatherBlock: {
      textAlign: 'center',
    },
  })

interface Props extends WithStyles<typeof styles> {}

interface InjectedProps extends Props {
  openWeatherStore: OpenWeatherStore
}

export default withStyles(styles)(WeatherWidget)
