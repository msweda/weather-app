import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import * as React from 'react'

const BasicPage: React.FC<Props> = ({ classes, children }) => {
  return (
    <div className={classes.basicPage}>
      <div className={classes.leftPageMargin} />
      <div className={classes.pageContent}>{children}</div>
      <div className={classes.rightPageMargin} />
    </div>
  )
}

const styles = (theme: Theme) =>
  createStyles({
    basicPage: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      backgroundColor: theme.palette.background.paper,
    },
    leftPageMargin: {
      flex: 1,
    },
    pageContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      width: 800,
      [theme.breakpoints.down('sm')]: {
        width: 600,
      },
      [theme.breakpoints.down('xs')]: {
        width: 300,
      },
      padding: 20,
    },
    rightPageMargin: {
      flex: 1,
    },
  })

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(BasicPage)
