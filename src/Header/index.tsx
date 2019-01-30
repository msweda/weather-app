import { appHeading } from '@/common/strings'
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import MobileMenu from './MobileMenu'

const Header: React.FC<Props> = ({ classes }) => (
  <div className={classes.header}>
    <Typography variant="h6">{appHeading}</Typography>
    <MobileMenu />
  </div>
)

const styles = () =>
  createStyles({
    header: {
      height: 50,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 20px',
      boxShadow: '0 1px 2px rgba(0,0,0,0)',
    },
  })

interface Props extends WithStyles<typeof styles> {}

export default withStyles(styles)(Header)
