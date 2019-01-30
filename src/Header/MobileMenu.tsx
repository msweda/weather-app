import { RootRoute } from '@/common/enums'
import { browserHistory } from '@/common/utils'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import mobileMenuItems from './mobileMenuItems'

class MobileMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <IconButton onClick={this.handleOpen}>
          <MenuIcon className={classes.menuButton} />
        </IconButton>
        <Drawer
          anchor="right"
          open={this.state.isOpen}
          onClose={this.handleClose}
        >
          <List>
            {mobileMenuItems.map((item, index) => (
              <ListItem
                key={`mobileMenu-listItem-${index}`}
                button={true}
                onClick={this.handleMenuItemClick.bind(this, item.route)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText secondary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    )
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleMenuItemClick = (route: RootRoute) => {
    browserHistory.push(route)
    this.handleClose()
  }
}

const styles = (theme: Theme) =>
  createStyles({
    menuButton: {
      color: theme.palette.background.paper,
    },
  })

interface Props extends WithStyles<typeof styles> {}
interface State {
  isOpen: boolean
}

export default withStyles(styles)(MobileMenu)
