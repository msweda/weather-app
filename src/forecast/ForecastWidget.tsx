import { UnitSelect, Weather } from '@/common/open-weather/components'
import OpenWeatherStore from '@/common/open-weather/store'
import { forecastFailed, noGeolocation } from '@/common/open-weather/strings'
import { isGeolocationAvailable } from '@/common/utils'
import { AllStores } from '@/src/stores'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import * as moment from 'moment'
import * as React from 'react'

@inject((allStores: AllStores) => ({
  openWeatherStore: allStores.openWeatherStore,
}))
@observer
class ForecastWidget extends React.Component<Props> {
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
          {this.renderGetForecastButton()}
        </div>
        {this.renderForecastBlock()}
      </React.Fragment>
    )
  }

  private renderGetForecastButton = () => {
    if (this.injected.openWeatherStore.forecastInProgress) {
      return <CircularProgress />
    }
    return (
      <Button variant="contained" color="primary" onClick={this.getForecast}>
        Get Forecast
      </Button>
    )
  }

  private renderForecastBlock = () => {
    if (
      this.injected.openWeatherStore.forecastSucceeded &&
      this.injected.openWeatherStore.forecastData !== undefined
    ) {
      const { classes } = this.props
      return (
        <div className={classes.forecastBlock}>
          <Typography variant="h6" color="textSecondary">
            Forecast for your area:
          </Typography>
          <Divider />
          <div className={classes.forecastBlockBody}>
            {this.injected.openWeatherStore.forecastData.list.map(
              (item, index) => {
                const datestring = moment
                  .unix(item.dt)
                  .format('MMMM Do YYYY, h:mm:ss a')
                return (
                  <Grid
                    key={`forecast-item=${index}`}
                    className={classes.item}
                    container={true}
                    spacing={16}
                  >
                    <Grid item={true} xs={12} sm={6}>
                      <Typography variant="subtitle1" color="primary">
                        {datestring}
                      </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={6}>
                      <div className={classes.itemWeatherDetails}>
                        <Typography variant="h5" color="primary">
                          {item.main.temp}
                        </Typography>
                        <Weather weather={item.weather} />
                      </div>
                    </Grid>
                  </Grid>
                )
              }
            )}
          </div>
        </div>
      )
    }

    if (this.injected.openWeatherStore.forecastFailed) {
      return <Typography>{forecastFailed}</Typography>
    }

    return null
  }

  private getForecast = () => {
    this.injected.openWeatherStore.getForecast()
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
    forecastBlock: {
      textAlign: 'center',
    },
    forecastBlockBody: {
      marginTop: 20,
      '& > *': {
        '&:nth-child(odd)': {
          backgroundColor: '#ddd',
        },
      },
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemWeatherDetails: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        marginLeft: 5,
        marginRight: 5,
      },
    },
  })

interface Props extends WithStyles<typeof styles> {}

interface InjectedProps extends Props {
  openWeatherStore: OpenWeatherStore
}

export default withStyles(styles)(ForecastWidget)
