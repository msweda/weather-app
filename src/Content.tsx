import { RootRoute } from '@/common/enums'
import Forecast from '@/forecast/index'
import Weather from '@/weather/index'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Content: React.FC<Props> = ({ classes }) => (
  <div className={classes.content}>
    <Switch>
      <Route exact={true} path={RootRoute.Weather} component={Weather} />
      <Route exact={true} path={RootRoute.Forecast} component={Forecast} />
      <Route component={DefaultContent} />
    </Switch>
  </div>
)

const DefaultContent: React.FC<any> = () => <Redirect to={RootRoute.Weather} />

const styles = (theme: Theme) =>
  createStyles({
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
    },
  })

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(Content)
