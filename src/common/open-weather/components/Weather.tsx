import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Weather as WeatherInterface } from '../interfaces'
import { weatherIconUrl } from '../strings'

class Weather extends React.Component<Props> {
  render() {
    const { classes, weather } = this.props
    return (
      <div className={classes.weatherIcons}>
        {weather.map((element, index) => (
          <div
            key={`weather-array-element-${index}`}
            className={classes.weatherArrayElement}
          >
            <img src={weatherIconUrl(element.icon)} width="30" height="30" />
            <Typography color="primary">{element.main}</Typography>
          </div>
        ))}
      </div>
    )
  }
}

const styles = () =>
  createStyles({
    weatherIcons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    weatherArrayElement: {
      margin: 10,
    },
  })

interface Props extends WithStyles<typeof styles> {
  weather: WeatherInterface
}

export default withStyles(styles)(Weather)
